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
const PACKAGES_MAPS = path.join(PACKAGES, "maps");
const PACKAGES_CSS = path.join(PACKAGES, "css");
const PACKAGES_ICONS = path.join(PACKAGES, "icons");
const PACKAGES_BRAND_ICONS = path.join(PACKAGES, "brand-icons");
const PACKAGES_FAVICONS = path.join(PACKAGES, "favicons");
const PACKAGES_FONTS = path.join(PACKAGES, "fonts");
const PACKAGES_TABLE = path.join(PACKAGES, "components-table");
const DOCS_PUBLIC = path.join(DIRNAME, "../docs/public");
const DOCS_ASSETS = path.join(DIRNAME, "../docs/stories");

async function main() {
  log.title('copy files to packages')

  // fonts
  await copyToPublic(path.join(PACKAGES_FONTS, 'lib'), 'assets/fonts')

  // download
  // await copyToPublic(path.join(PACKAGES_FONTS, 'dist/fonts.zip'), 'assets/download/fonts.zip')
  // await copyToPublic(path.join(PACKAGES_FAVICONS, 'dist/favicons.zip'), 'assets/download/favicons.zip')
  // await copyToPublic(path.join(PACKAGES_MAPS, 'dist/map-markers.zip'), 'assets/download/map-markers.zip')
  // await copyToPublic(path.join(PACKAGES_ICONS, 'dist/icons.zip'), 'assets/download/icons.zip')

  // images
  await copyToAsset(path.join(PACKAGES_MAPS, 'markers'), 'assets/images/map-markers')

  // data
  await copyToAsset(path.join(PACKAGES_ICONS, 'dist/icons.json'), 'assets/data/icons.json')
  await copyToAsset(path.join(PACKAGES_BRAND_ICONS, 'dist/brand-icons.json'), 'assets/data/brand-icons.json')
  await copyToAsset(path.join(PACKAGES_COMPONENTS, '.tmp/commands.json'), 'assets/data/commands.json')
  await copyToAsset(path.join(PACKAGES_COMPONENTS, '.tmp/components.json'), 'assets/data/components.json')
  await copyToAsset(path.join(PACKAGES_COMPONENTS, '.tmp/components.d.ts'), 'assets/data/components.d.ts')
  await copyToAsset(path.join(PACKAGES_COMPONENTS, '.tmp/contributors.json'), 'assets/data/contributors.json')
  await copyToAsset(path.join(PACKAGES_COMPONENTS, '.tmp/selectors.json'), 'assets/data/selectors.json')
  await copyToAsset(path.join(DIRNAME, 'data/tags.json'), 'assets/data/tags.json')

  // stylesheets
  await copyToPublic(path.join(PACKAGES_TABLE, 'css/design-system-table.css'), 'assets/css/design-system-table.css')
  await copyToPublic(path.join(PACKAGES_CSS, 'css/baloise-design-system.min.css'), 'assets/css/baloise-design-system.min.css')

  // icons
  await copyToPublic(path.join(PACKAGES_ICONS, 'svg'), 'assets/images/icons')
  await copyToPublic(path.join(PACKAGES_BRAND_ICONS, 'svg'), 'assets/images/brand-icons')

  log.success('Resources are copied')
}

async function copyToPublic(src, target) {
  await file.copy(src, path.join(DOCS_PUBLIC, target))
}

async function copyToAsset(src, target) {
  await file.copy(src, path.join(DOCS_ASSETS, target))
}

main()
