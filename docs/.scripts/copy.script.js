const path = require('path')
const log = require('../../.scripts/log')
const file = require('../../.scripts/file')

async function main() {
  log.title('copy resources')
  await file.empty(path.join(__dirname, '../src/.vuepress/public/assets/fonts'))
  await file.empty(path.join(__dirname, '../src/.vuepress/lib/loader'))
  await file.empty(path.join(__dirname, '../src/.vuepress/lib/dist'))
  await file.copy(
    path.join(__dirname, '../../packages/fonts/lib'),
    path.join(__dirname, '../src/.vuepress/public/assets/fonts'),
  )
  await file.copy(
    path.join(__dirname, '../../resources/images/logo.svg'),
    path.join(__dirname, '../src/.vuepress/public/assets/images/logo.svg'),
  )
  await file.copy(
    path.join(__dirname, '../../packages/components/dist'),
    path.join(__dirname, '../src/.vuepress/lib/dist'),
  )
  await file.copy(
    path.join(__dirname, '../../packages/components/loader'),
    path.join(__dirname, '../src/.vuepress/lib/loader'),
  )
  await file.copy(
    path.join(__dirname, '../../packages/components/dist/design-system-components/design-system-components.css'),
    path.join(__dirname, '../src/.vuepress/styles/design-system-components.css'),
  )
  await file.copy(path.join(__dirname, '../../CHANGELOG.md'), path.join(__dirname, '../src/resources/changelog.md'))
  log.success('Resources are copied')
}

main()
