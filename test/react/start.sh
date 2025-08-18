#!/bin/bash

# The specific application
APP_DIR="${1}"

# The full path to the built application.
BUILD_APP_DIR="${APP_DIR}/"

pushd $BUILD_APP_DIR
npm start
popd
