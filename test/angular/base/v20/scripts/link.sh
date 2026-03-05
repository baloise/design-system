#!/bin/bash

pushd ../../..

pushd packages/tokens
npm link
popd

pushd packages/assets
npm link
popd

pushd packages/styles
npm link
popd

pushd packages/core
npm link
popd

pushd packages/testing/dist
npm link
popd

popd
npm link @baloise/ds-tokens @baloise/ds-assets @baloise/ds-styles @baloise/ds-core @baloise/ds-testing

echo "=> Angular project is linked with components"
