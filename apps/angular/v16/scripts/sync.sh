#!/bin/bash

set -e

# Delete old packages
rm -f *.tgz

# Pack @ionic/core
npm pack ../../../packages/components

# Install Dependencies
npm install *.tgz --no-save

# Delete Angular cache directory
rm -rf .angular/

echo "Angular project is synced"
