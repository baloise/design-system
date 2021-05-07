const path = require('path')
const log = require('./log')
const file = require('./file')

async function main() {
  log.title('copy readme')
  await copyReadme('components')
  await copyReadme('components-angular')
  await copyReadme('components-vue')
  await copyReadme('components-vue-2')
  await copyReadme('icons')
  await copyReadme('fonts')
  await copyReadme('testing')
  log.success('Resources are copied')
}

async function copyReadme(dest) {
  await file.copy(path.join(__dirname, '../README.md'), path.join(__dirname, `../packages/${dest}/README.md`))
}

main()
