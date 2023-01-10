/**
 * globals
 * --------------------------------------
 * Renames a variable to avoid duplicated identifier issues.
 */

const path = require('path')
const replace = require('replace-in-file');
const log = require('./utils/log.js')

const DIRNAME = path.normalize(__dirname);
const PACKAGE = path.join(DIRNAME, "../packages/components");
const DIST_PATH = path.join(PACKAGE, 'dist')

async function main(){
  log.title('globals')

  adjustGlobalVar(DIST_PATH + '/**/app-globals*.js')
}

async function adjustGlobalVar(files){
  try {
    await replace({
      files: files,
      from: `const global`,
      to: `const globalImport`,
    })
    const results = await replace({
      files: files,
      from: `const globalScripts = global.globalScript;`,
      to: `const globalScripts = globalImport.globalScript;`,
    })
    const changedFiles = results.filter(r => r.hasChanged).map(r => r.file)
    changedFiles.forEach(f => log.list(f))
  }
  catch (error) {
    log.warn('Could not adjust global script to dist output', error)
  }
}

main()
