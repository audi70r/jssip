#/bin/bash

set -e

npm install
gulp prod

rsync -rvu --copy-links --delete out/ v2:/var/www/tryit.jssip.net/
