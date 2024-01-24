import { fileURLToPath } from 'url'
import replace from 'replace-in-file'
import path from 'path'
import { copy, done, logger, readFile, writeFile } from '../../../scripts/utils.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.join(path.dirname(__filename), '..')
const __root = path.join(__dirname, '../..')

const run = async () => {
  const log = logger('components post build')
  log.start()

  try {
    await adjustInterfacesReference()
    await adjustGlobalVar()
    await setVersion()
    await createTagList()
    await copyToDocs()
    log.succeed()
  } catch (error) {
    log.fail(error)
  } finally {
    done()
  }
}

export async function adjustInterfacesReference() {
  const files = path.join(__dirname, 'dist/types/**/*interfaces.d.ts')
  replace.sync({
    files: files,
    from: `/// <reference path="../../../../../src/interfaces.d.ts" />`,
    to: `/// <reference path="../../../../interfaces.d.ts" />`,
  })
  replace.sync({
    files: files,
    from: `/// <reference path="../../../../src/interfaces.d.ts" />`,
    to: `/// <reference path="../../../interfaces.d.ts" />`,
  })
  replace.sync({
    files: files,
    from: `/// <reference path="../../../src/interfaces.d.ts" />`,
    to: `/// <reference path="../../interfaces.d.ts" />`,
  })
}

async function adjustGlobalVar() {
  const files = path.join(__dirname, 'dist/cjs/app-globals*.js')
  await replace({
    files: files,
    from: `const global =`,
    to: `const globalImport =`,
  })
  await replace({
    files: files,
    from: `const globalScripts = global.globalScript;`,
    to: `const globalScripts = globalImport.globalScript;`,
  })
}

// Reads version from package.json and saves it to the browsers window
async function setVersion() {
  const content = await readFile(path.join(__dirname, 'package.json'))
  const json = JSON.parse(content)
  await replace({
    files: path.join(__dirname, 'dist', '**/*.js'),
    from: /BAL_DEV_VERSION/g,
    to: json.version,
  })
}

// This script creates a list with all the main component tags.
export async function createTagList() {
  const content = await readFile(path.join(__dirname, '.tmp/components.json'))
  const json = JSON.parse(content)
  const componentTags = json.components
    .map(component => component.tag)
    .filter(tag => !tag.startsWith('bal-doc'))
    .reduce((acc, newTag) => {
      const hasComponent = acc.some(tag => newTag.startsWith(tag))
      if (!hasComponent && newTag !== 'bal-tab-item' && newTag !== 'bal-notices') {
        acc.push(newTag)
      }
      return acc
    }, [])
  await writeFile(path.join(__root, 'resources/data/tags.json'), JSON.stringify(componentTags, undefined, 2))
}

async function copyToDocs() {
  await copy(path.join(__dirname, 'www'), path.join(__root, 'test/generated/www'))
}

run()
