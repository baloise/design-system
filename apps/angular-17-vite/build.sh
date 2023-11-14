#!/bin/bash

rm -rf src/generated

mkdir -p src/generated

cp -R ../../packages/components-angular/src src/generated/src
cp -R ../../packages/components-angular/common src/generated/common
cp -R ../../packages/components-angular/standalone src/generated/standalone
cp -R ../../packages/components-angular/legacy src/generated/legacy

echo "Copied test app files"
