/**
 * globals
 * --------------------------------------
 * Renames a variable to avoid duplicated identifier issues.
 */

const path = require('path')
const replace = require('replace-in-file');
const log = require('./utils/log.js')

const DIST_PATH = path.join(process.cwd(), 'dist')

async function main(){
  log.title('globals')

  adjustGlobalVar(DIST_PATH + '/**/app-globals*.js')
}

async function adjustGlobalVar(files){
  try {
    const results = await replace({
      files: files,
      from: `const global = require('./global-870fff11.js');

const globalScripts = global.globalScript;`,
      to: `const globalScript = require('./global-870fff11.js');

const globalScripts = globalScript.globalScript;`,
    })
    const changedFiles = results.filter(r => r.hasChanged).map(r => r.file)
    changedFiles.forEach(f => log.list(f))
  }
  catch (error) {
    log.warn('Could not adjust global script to dist output', error)
  }
}

main()
