#!/bin/bash

pushd ../../..

pushd packages/tokens
npm link
popd

pushd packages/fonts
npm link
popd

pushd packages/icons
npm link
popd

pushd packages/css
npm link
popd

pushd packages/components
npm link
popd

pushd packages/components-angular
npm link
popd

pushd packages/testing
npm link
popd

popd
npm link @baloise/design-system-tokens
npm link @baloise/design-system-fonts
npm link @baloise/design-system-icons
npm link @baloise/design-system-css
npm link @baloise/design-system-components
npm link @baloise/design-system-components-angular
npm link @baloise/design-system-testing

echo "=> Angular project is linked with components"
