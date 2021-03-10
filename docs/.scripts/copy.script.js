const path = require('path')
const log = require('../../.scripts/log')
const file = require('../../.scripts/file')

async function main() {
  log.title('copy resources')
  await file.empty(path.join(__dirname, '../src/.vuepress/public/assets/fonts'))
  await file.empty(path.join(__dirname, '../src/.vuepress/lib/loader'))
  await file.empty(path.join(__dirname, '../src/.vuepress/lib/dist'))
  await file.copy(
    path.join(__dirname, '../../resources/fonts'),
    path.join(__dirname, '../src/.vuepress/public/assets/fonts'),
  )
  await file.copy(
    path.join(__dirname, '../../resources/images/logo.svg'),
    path.join(__dirname, '../src/.vuepress/public/assets/images/logo.svg'),
  )
  await file.copy(
    path.join(__dirname, '../../packages/library/dist'),
    path.join(__dirname, '../src/.vuepress/lib/dist'),
  )
  await file.copy(
    path.join(__dirname, '../../packages/library/loader'),
    path.join(__dirname, '../src/.vuepress/lib/loader'),
  )
  await file.copy(
    path.join(__dirname, '../../packages/library/dist/ui-library/ui-library.css'),
    path.join(__dirname, '../src/.vuepress/styles/ui-library.css'),
  )
  await file.copy(path.join(__dirname, '../../CHANGELOG.md'), path.join(__dirname, '../src/guide/CHANGELOG.md'))
  log.success('Resources are copied')
}

main()
