const path = require('path')
const log = require('../../.scripts/log')
const file = require('../../.scripts/file')

async function main() {
  log.title('copy resources')
  await file.empty(path.join(__dirname, '../src/.vuepress/public/assets/fonts'))
  await file.empty(path.join(__dirname, '../src/.vuepress/public/lib/loader'))
  await file.empty(path.join(__dirname, '../src/.vuepress/public/lib/dist'))
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
    path.join(__dirname, '../src/.vuepress/public/lib/dist'),
  )
  await file.copy(
    path.join(__dirname, '../../packages/library/loader'),
    path.join(__dirname, '../src/.vuepress/public/lib/loader'),
  )
  log.success('Resources are copied')
}

main()
