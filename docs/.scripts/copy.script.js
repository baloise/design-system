const path = require('path')
const log = require('../../.scripts/log')
const file = require('../../.scripts/file')

async function main() {
  log.title('copy resources')
  await file.copy(
    path.join(__dirname, '../../packages/library/src/assets/fonts'),
    path.join(__dirname, '../src/.vuepress/public/assets/fonts'),
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

// "build:lib:dist": "cpy ./ ../../../docs/src/.vuepress/public/lib/dist/ --parents --cwd=../packages/library/dist",
// "build:lib:loader": "cpy ./ ../../../docs/src/.vuepress/public/lib/loader/ --parents --cwd=../packages/library/loader"
