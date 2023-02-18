/**
 * interfaces
 * --------------------------------------
 * Adjust the reference path to the correct file.
 */

const path = require('path')
const replace = require('replace-in-file');
const log = require('./utils/log.js')

const DIRNAME = path.normalize(__dirname);
const PACKAGE = path.join(DIRNAME, "../packages/components");
const DIST_PATH = path.join(PACKAGE, 'dist')

async function main(){
  log.title('interfaces')

  adjustInterfacesReference(DIST_PATH + '/**/*interfaces.d.ts')
}

async function adjustInterfacesReference(files){
  try {
    await replace({
      files: files,
      from: `/// <reference path="../../../../src/interfaces.d.ts" />`,
      to: `/// <reference path="../../../interfaces.d.ts" />`,
    })
    await replace({
      files: files,
      from: `/// <reference path="../../../src/interfaces.d.ts" />`,
      to: `/// <reference path="../../interfaces.d.ts" />`,
    })
  }
  catch (error) {
    log.warn('Could not adjust interface references to dist output', error)
  }
}

main()
