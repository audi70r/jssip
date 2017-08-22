# gulp-nodeunit-runner
[![NPM version][npm-image]][npm-url] [![Dependency Status][depstat-image]][depstat-url] [![Build Status][travis-image]][travis-url]

> nodeunit-runner plugin for [gulp](https://github.com/wearefractal/gulp)

## Usage

First, install `gulp-nodeunit-runner` as a development dependency:

```shell
npm install --save-dev gulp-nodeunit-runner
```

Then, add it to your `gulpfile.js`:

```javascript
var nodeunit-runner = require("gulp-nodeunit-runner");

gulp.src("./src/*.ext")
	.pipe(nodeunit-runner());
```

## API

### nodeunit-runner(options)

#### options.reporter
Type: `String`  
Default: `default`

The nodeunit reporter to use. See [nodeunit](https://github.com/caolan/nodeunit) documentation for a complete list.

#### options.reporterOptions
Type: `Object`  
Default: reporter defaults

Nodeunit provides a set of callbacks that will be executed during test execution. These are used by the reporter but can be overridden using this option. See [nodeunit](https://github.com/caolan/nodeunit) documentation for a complete list.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/gulp-nodeunit-runner
[npm-image]: https://badge.fury.io/js/gulp-nodeunit-runner.png

[travis-url]: http://travis-ci.org/baer/gulp-nodeunit-runner
[travis-image]: https://secure.travis-ci.org/baer/gulp-nodeunit-runner.png?branch=master

[depstat-url]: https://david-dm.org/baer/gulp-nodeunit-runner
[depstat-image]: https://david-dm.org/baer/gulp-nodeunit-runner.png
