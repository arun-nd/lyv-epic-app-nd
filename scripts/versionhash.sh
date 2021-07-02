#!/bin/sh
hash=`git rev-parse --short HEAD`
echo "\"$hash\"" > src/assets/hash.json
