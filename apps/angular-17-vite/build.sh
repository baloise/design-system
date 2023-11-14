#!/bin/bash

rm -rf src/generated

mkdir -p src/generated

cp -R ../../packages/components-angular src/generated

rm -rf src/generated/components-angular/.turbo
rm -rf src/generated/components-angular/dist
rm -rf src/generated/components-angular/node_modules
rm -rf src/generated/components-angular/ng-package.json
rm -rf src/generated/components-angular/tsconfig.json
rm -rf src/generated/components-angular/package.json
rm -rf src/generated/components-angular/CHANGELOG.md
rm -rf src/generated/components-angular/README.md
rm -rf src/generated/components-angular/LICENSE
rm -rf src/generated/components-angular/common/ng-package.json
rm -rf src/generated/components-angular/standalone/ng-package.json
rm -rf src/generated/components-angular/legacy/ng-package.json

echo "Copied test app files"
