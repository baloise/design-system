#!/bin/bash

pushd ../../..

pushd packages/tokens
npm link
popd

pushd packages/fonts
npm link
popd

pushd packages/css
npm link
popd

pushd packages/components
npm link
popd

popd
npm link @baloise/design-system-tokens
npm link @baloise/design-system-fonts
npm link @baloise/design-system-css
npm link @baloise/design-system-components

echo "=> Angular project is linked with components"
