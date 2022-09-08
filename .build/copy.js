/**
 * copy task
 * --------------------------------------
 * Copies the README to each package to avoid managing duplicates.
 */

const path = require('path')
const log = require('./utils/log')
const file = require('./utils/file')

async function main() {
  log.title('copy files to packages')

  await copyToPackage('packages/components')
  await copyToPackage('packages/components-angular')
  await copyToPackage('packages/components-table')
  await copyToPackage('packages/components-vue')
  await copyToPackage('packages/components-react')
  await copyToPackage('packages/icons')
  await copyToPackage('packages/fonts')
  await copyToPackage('packages/testing')
  await copyToPackage('packages/tokens')
  await copyToPackage('packages/css')
  await copyToPackage('packages/output-targets/angular')
  await copyToPackage('packages/output-targets/vue')
  await copyToPackage('packages/output-targets/react')
  log.success('Resources are copied')
}

async function copyToPackage(dest) {
  await file.copy(path.join(__dirname, '../LICENSE'), path.join(__dirname, `../${dest}/LICENSE`))
  await file.copy(path.join(__dirname, '../README.md'), path.join(__dirname, `../${dest}/README.md`))
}

main()
