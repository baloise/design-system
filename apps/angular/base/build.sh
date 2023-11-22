#!/bin/bash

rm -rf src/generated

mkdir -p src/generated

cp -R ../../../../packages/components-angular/src src/generated/src
cp -R ../../../../packages/components-angular/common src/generated/common

echo "Copied test app files"
