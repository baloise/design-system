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
# @baloise/ds-css's own dependencies (@baloise/ds-assets, @baloise/ds-tokens) don't
# need packing here - they resolve through packages/css's own node_modules inside
# the monorepo, since it's a real workspace member there.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR/.."

rm -rf .tgz
mkdir -p .tgz
pnpm pack --pack-destination "$(pwd)/.tgz" --dir ../../../packages/core > /dev/null
pnpm pack --pack-destination "$(pwd)/.tgz" --dir ../../../packages/angular > /dev/null
pnpm pack --pack-destination "$(pwd)/.tgz" --dir ../../../packages/css > /dev/null

pnpm add \
  "file:$(pwd)/.tgz/$(ls .tgz | grep ds-core)" \
  "file:$(pwd)/.tgz/$(ls .tgz | grep ds-angular)" \
  "file:$(pwd)/.tgz/$(ls .tgz | grep ds-css)"

echo "=> Installed @baloise/ds-core, @baloise/ds-angular and @baloise/ds-css into $(pwd) from packed tarballs"
