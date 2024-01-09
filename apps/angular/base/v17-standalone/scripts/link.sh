#!/bin/bash

pushd ../../..

pushd packages/tokens
npm link
popd

pushd packages/fonts
npm link
popd

pushd packages/styles
npm link
popd

pushd packages/icons
npm link
popd

pushd packages/components
npm link
popd

pushd packages/testing
npm link
popd

popd
npm link @baloise/design-system-tokens @baloise/design-system-fonts @baloise/design-system-icons @baloise/design-system-styles @baloise/design-system-components @baloise/design-system-testing

echo "=> Angular project is linked with components"
