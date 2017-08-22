#!/usr/bin/env node


var exit = process.exit;
var version = require('../package.json').version;
var shell = require('shelljs')
var fs = require('fs-extra');
var path = require('path');
var ret;


var PATH_TRYIT_JSSIP = '/Users/jmillan/src/tryit-jssip';
var PATH_JSSIP_WEB = '/Users/jmillan/src/JsSIP_web';


//console.log('>>> delete dist/ folder:');

//fs.deleteSync('dist/');


//console.log('>>> gulp:');

//ret = shell.exec('gulp').code;
//if (ret) { exit(1); }


/*
console.log('>>> git tag & push (version %s):', version);

ret = shell.exec('git tag -a ' + version + ' -m "' + version + '"').code;
if (ret) { exit(1); }

ret = shell.exec('git push origin master && git push origin --tags').code;
if (ret) { exit(1); }
*/


console.log('>>> npm publish:');

ret = shell.exec('npm publish').code;
if (ret) { exit(1); }


console.log('>>> update tryit-jssip:');

ret = shell.exec('cd ' + PATH_TRYIT_JSSIP + ' && ./NO_GIT/upload.sh').code;
if (ret) { exit(1); }


console.log('>>> update JsSIP_web:');

fs.copySync('dist/jssip.js', path.join(PATH_JSSIP_WEB, 'content/download/releases/jssip-' + version + '.js'));
fs.copySync('dist/jssip.min.js', path.join(PATH_JSSIP_WEB, 'content/download/releases/jssip-' + version + '.min.js'));

var my_lib = fs.readFileSync(path.join(PATH_JSSIP_WEB, 'lib/my_lib.rb')).toString();
var my_lib_new = my_lib.replace(/@jssip_last_full_version = .*/, '@jssip_last_full_version = "' + version + '"');
fs.writeFileSync(path.join(PATH_JSSIP_WEB, 'lib/my_lib.rb'), my_lib_new, 'utf8');

ret = shell.exec('cd ' + PATH_JSSIP_WEB + ' && git pull origin master && git add content && git commit -a -m "' + version + '" && git push origin master').code;
if (ret) { exit(1); }

ret = shell.exec('cd ' + PATH_JSSIP_WEB + ' && ./upload.sh').code;
if (ret) { exit(1); }

console.log('>>> done');
