#!/bin/bash

rm -rf src/generated

mkdir -p src/generated

cp -R ../../packages/components-angular/src src/generated

echo "Copied test app files"
