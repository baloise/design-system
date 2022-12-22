/**
 * version
 * --------------------------------------
 * Reads version from package.json and saves it to the browsers
 * window
 */

const path = require('path')
const replace = require('replace-in-file');
const log = require('./utils/log.js')

const DIST_PATH = path.join(process.cwd(), 'dist')

async function main(){
  log.title('version')

  const { version } = require(path.join(process.cwd(), 'package.json'))

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
    log.warn('Could not set version to dist output', error)
  }
}

main()
