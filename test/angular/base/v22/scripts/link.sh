#!/bin/bash
set -euo pipefail

# Installs the locally built @baloise/ds-angular, @baloise/ds-core and @baloise/ds-css
# into this app from packed tarballs, simulating an npm-installed consumer instead of
# pnpm workspace resolution. See docs/adr/0004-react-smoke-test-app-outside-workspace.md.
#
# Packing (rather than `pnpm link`/`file:` on the raw source directories) matters here:
# a raw directory link exposes that package's own devDependency-installed node_modules
# (e.g. packages/angular's own @angular/core, needed only for its ng-packagr build) to
# this app's module resolution, causing a second, incompatible @angular/core instance to
# get bundled alongside this app's own copy (Angular's DI throws NG0203 when that happens).
# A packed tarball only contains what "files" in package.json declares (dist/ + manifest),
# exactly like a real npm-published tarball, so no nested node_modules leaks through and
# peerDependencies resolve normally against this app's own installed versions.
#
# @baloise/ds-core and @baloise/ds-css both depend on @baloise/ds-assets and
# @baloise/ds-tokens. This app is its own isolated pnpm workspace (see the ADR
# above), not a member of the monorepo workspace, so those transitive deps
# can't resolve through packages/core's or packages/css's node_modules -
# pnpm would instead try to fetch them from the npm registry at whatever
# version is in the packed package.json, which doesn't exist there yet
# during the version-bump PR window before a release is published. Pack and
# link them too so resolution stays entirely local.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR/.."

rm -rf .tgz
mkdir -p .tgz
pnpm pack --pack-destination "$(pwd)/.tgz" --dir ../../../packages/assets > /dev/null
pnpm pack --pack-destination "$(pwd)/.tgz" --dir ../../../packages/tokens > /dev/null
pnpm pack --pack-destination "$(pwd)/.tgz" --dir ../../../packages/core > /dev/null
pnpm pack --pack-destination "$(pwd)/.tgz" --dir ../../../packages/angular > /dev/null
pnpm pack --pack-destination "$(pwd)/.tgz" --dir ../../../packages/css > /dev/null

pnpm add \
  "file:$(pwd)/.tgz/$(ls .tgz | grep ds-assets)" \
  "file:$(pwd)/.tgz/$(ls .tgz | grep ds-tokens)" \
  "file:$(pwd)/.tgz/$(ls .tgz | grep ds-core)" \
  "file:$(pwd)/.tgz/$(ls .tgz | grep ds-angular)" \
  "file:$(pwd)/.tgz/$(ls .tgz | grep ds-css)"

echo "=> Installed @baloise/ds-assets, @baloise/ds-tokens, @baloise/ds-core, @baloise/ds-angular and @baloise/ds-css into $(pwd) from packed tarballs"
