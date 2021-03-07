const path = require('path')
const log = require('./log')
const file = require('./file')

async function main() {
  log.title('copy readme')
  await copyReadme('angular')
  await copyReadme('vue')
  await copyReadme('vue-2')
  await copyReadme('testing')
  await copyReadme('library')
  log.success('Resources are copied')
}

async function copyReadme(dest) {
  await file.copy(path.join(__dirname, '../README.md'), path.join(__dirname, `../packages/${dest}/README.md`))
}

main()
