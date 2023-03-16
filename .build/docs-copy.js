/**
* copy task
* --------------------------------------
* Copies static files to the docs public folder
*/

const path = require('path')
const log = require('./utils/log')
const file = require('./utils/file')

const DIRNAME = path.normalize(__dirname, '..');
const PACKAGES = path.join(DIRNAME, "../packages");
const PACKAGES_COMPONENTS = path.join(PACKAGES, "components");
const PACKAGES_COMPONENTS_PUBLIC = path.join(PACKAGES_COMPONENTS, "public");
const PACKAGES_MAPS = path.join(PACKAGES, "maps");
const PACKAGES_ICONS = path.join(PACKAGES, "icons");
const PACKAGES_FAVICONS = path.join(PACKAGES, "favicons");
const PACKAGES_FONTS = path.join(PACKAGES, "fonts");
const PACKAGES_TABLE = path.join(PACKAGES, "components-table");

async function main() {
  log.title('copy files to packages')

  await copyToPublic(path.join(PACKAGES_FONTS, 'lib'), 'assets/fonts')
  await copyToPublic(path.join(PACKAGES_FONTS, 'dist/fonts.zip'), 'assets/download/fonts.zip')
  await copyToPublic(path.join(PACKAGES_FAVICONS, 'dist/favicons.zip'), 'assets/download/favicons.zip')
  await copyToPublic(path.join(PACKAGES_MAPS, 'dist/map-markers.zip'), 'assets/download/map-markers.zip')
  await copyToPublic(path.join(PACKAGES_MAPS, 'markers'), 'assets/images/map-markers')
  await copyToPublic(path.join(PACKAGES_ICONS, 'dist/icons.zip'), 'assets/download/icons.zip')
  await copyToPublic(path.join(PACKAGES_ICONS, 'dist/icons.json'), 'assets/data/icons.json')
  await copyToPublic(path.join(PACKAGES_TABLE, 'css/design-system-table.css'), 'assets/css/design-system-table.css')

  log.success('Resources are copied')
}

async function copyToPublic(src, target) {
  await file.copy(src, path.join(PACKAGES_COMPONENTS_PUBLIC, target))
}

main()
