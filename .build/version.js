/**
 * version
 * --------------------------------------
 * Reads version from package.json and saves it to the browsers
 * window
 */

const path = require('path')
const replace = require('replace-in-file');
const log = require('./utils/log.js')

const DIST_PATH = path.join(__dirname, '..', 'packages/components/dist')

async function main(){
  log.title('version')

  const lerna = require('../lerna.json')
  const version = lerna.version

  setVersion(DIST_PATH + '/**/*.js', version)
}

async function setVersion(files, version){
  try {
    const results = await replace({
      files: files,
      from: /BAL_DEV_VERSION/g,
      to: version,
    })
    const changedFiles = results.filter(r => r.hasChanged).map(r => r.file)
    changedFiles.forEach(f => log.list(f))
  }
  catch (error) {
    log.error('Could not set version to dist output', error)
  }
}

main()
