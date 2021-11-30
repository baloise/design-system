const path = require('path')
const log = require('./log')
const file = require('./file')

async function main() {
  log.title('copy readme')
  await copyReadme('packages/components')
  await copyReadme('packages/components-angular')
  await copyReadme('packages/components-table')
  await copyReadme('packages/components-vue')
  await copyReadme('packages/components-react')
  await copyReadme('packages/icons')
  await copyReadme('packages/fonts')
  await copyReadme('packages/testing')
  log.success('Resources are copied')
}

async function copyReadme(dest) {
  await file.copy(path.join(__dirname, '../README.md'), path.join(__dirname, `../${dest}/README.md`))
}

main()
