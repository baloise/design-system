#!/bin/bash

# The specific application
# we are building
APP_DIR="${1}"

# The full path to the base application.
FULL_BASE_DIR="base/app/."

# The full path to the specific application.
FULL_APP_DIR="base/${APP_DIR}/."

# The full path to the built application.
BUILD_APP_DIR="${APP_DIR}/"

# First we need to copy the base application
cp -R $FULL_BASE_DIR $BUILD_APP_DIR

# Then we can copy the specific app which
# will override any files in the base application.
cp -R $FULL_APP_DIR $BUILD_APP_DIR

pushd $BUILD_APP_DIR
npm run copy
npm install
npm run link
popd

echo "Copied test app files for ${APP_DIR}"
