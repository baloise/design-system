#!/bin/bash
echo "Prepare Angular Test Apps"

# The directory where the source
# for each specific application is.
APPS_DIR="apps/angular"

# The directory where the
# base application logic is
BASE_DIR="base"
BUILD_DIR="build"

FULL_BASE_DIR="${APPS_DIR}/${BASE_DIR}/."

FULL_APP_DIR="${APPS_DIR}/versions/v16/."
BUILD_APP_16_DIR="${APPS_DIR}/${BUILD_DIR}/v16/"

# Make the build directory if it does not already exist.
mkdir -p $BUILD_APP_16_DIR

# First we need to copy the base application
cp -R $FULL_BASE_DIR $BUILD_APP_16_DIR

# Then we can copy the specific app which
# will override any files in the base application.
cp -R $FULL_APP_DIR $BUILD_APP_16_DIR

echo "Copied test app files"
