#!/usr/bin/env node


var exit = process.exit;
var version = require('../package.json').version;
var sh = require('execSync');
var fs = require('fs-extra');
var ret;



//console.log('>>> delete dist/ folder:');

//fs.deleteSync('dist/');


//console.log('>>> gulp:');

//ret = sh.run('gulp');
//if (ret) { exit(1); }


console.log('>>> update JsSIP_web:');

fs.copySync('../dist/jssip-' + version + '.js', '/Users/jmillan/src/JsSIP_web/content/download/releases/jssip-' + version + '.js');
fs.copySync('../dist/jssip-' + version + '.min.js', '/Users/jmillan/src/JsSIP_web/content/download/releases/jssip-' + version + '.min.js');

var my_lib = fs.readFileSync('/Users/jmillan/src/JsSIP_web/lib/my_lib.rb').toString();
var my_lib_new = my_lib.replace(/@jssip_last_full_version = .*/, '@jssip_last_full_version = "' + version + '"');
fs.writeFileSync('/Users/jmillan/src/JsSIP_web/lib/my_lib.rb', my_lib_new, 'utf8');

ret = sh.run('cd /Users/jmillan/src/JsSIP_web/ && git add content && git commit -a -m "' + version + '" && git push origin master');
if (ret) { exit(1); }

ret = sh.run('cd /Users/jmillan/src/JsSIP_web/ && ./upload.sh');
if (ret) { exit(1); }

sh('echo executing echo');

console.log('>>> done');
