#!/bin/bash

pushd ../../..

pushd packages/components
npm link

popd

popd
npm link @baloise/design-system-components

echo "=> Angular project is linked with components"
