var through = require('through2')
  , gutil = require('gulp-util')
  , path = require('path')
  , fs = require('fs')
  , nodeunit = require('nodeunit');

module.exports = function (options) {
  'use strict';

  options = options || {};
  options.reporter = options.reporter || 'default';

  // Check for the nodeunit reporter
  if (!nodeunit.reporters[options.reporter]) {
    throw new gutil.PluginError('gulp-nodeunit-runner', 'Reporter ' + options.reporter + ' not found');
  }

  // Ensure the default nodeunit options are set by reading in the nodeunit.json file.
  var nodeUnitDefaults = {};
  var nodeUnitDefaultsFile = path.join(__dirname, '..', 'node_modules', 'nodeunit', 'bin', 'nodeunit.json');

  if (fs.existsSync(nodeUnitDefaultsFile)) {
    nodeUnitDefaults = JSON.parse(fs.readFileSync(nodeUnitDefaultsFile, 'utf8'));
  }

  for (var defaultVal in nodeUnitDefaults) {
    if (typeof options.reporterOptions[defaultVal] === 'undefined') {
      options.reporterOptions[defaultVal] = nodeUnitDefaults[defaultVal];
    }
  }

  var specs = [];
  function nodeunitRunner(file, enc, callback) {
    // Do nothing if no contents
    if (file.isNull()) {
      this.push(file);
      return callback();
    }

    if (file.isStream()) {
      this.emit('error',
        new gutil.PluginError('gulp-nodeunit-runner', 'Stream content is not supported'));
      return callback();
    }

    if (file.isBuffer()) {
      specs.push(file.path);
      this.push(file);
    }
    return callback();
  }

  return through.obj(nodeunitRunner, function (callback) {
    nodeunit.reporters[options.reporter].run(specs, options.reporterOptions, function(err) {
      callback(err);
    });

  });
};