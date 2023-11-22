#!/bin/bash

set -e

# # Delete old packages
# rm -f *.tgz

# # Pack @ionic/core
# npm pack ../../../packages/components

# Install Dependencies
npm install *.tgz --no-save

# Delete Angular cache directory
rm -rf .angular/

# Copy base angular app with cypress test into version space
cp -R -n ../base/. ./.

# Clean generated files and create folder
rm -rf src/generated
mkdir -p src/generated

# Copy angular proxy library to version space
cp -R ../../../packages/components-angular/common src/generated/common
cp -R ../../../packages/components-angular/src src/generated/src

echo "Angular project is synced"
