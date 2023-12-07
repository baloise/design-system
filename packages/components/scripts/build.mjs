import { fileURLToPath } from 'url'
import replace from 'replace-in-file'
import path from 'path'
import { done, logger, readFile } from '../../../.build/utils/index.mjs'
import { adjustInterfacesReference } from './interfaces.mjs'
import { createTagList } from './tags.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.join(path.dirname(__filename), '..')
const __root = path.join(__dirname, '../../')

const run = async () => {
  const log = logger('components post build')
  log.start()

  try {
    await adjustInterfacesReference()
    await adjustGlobalVar()
    await setVersion()
    await createTagList()
    log.succeed()
  } catch (error) {
    log.fail(error)
  } finally {
    done()
  }
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

run()
