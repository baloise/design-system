import { fileURLToPath } from 'url'
import replace from 'replace-in-file'
import path from 'path'
import { done, logger } from '../../../.build/utils/index.mjs'
import { adjustInterfacesReference } from './interfaces.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.join(path.dirname(__filename), '..')

const run = async () => {
  const log = logger('components post build')
  log.start()

  try {
    await adjustInterfacesReference()
    await adjustGlobalVar()
    log.succeed()
  } catch (error) {
    log.fail(error)
  } finally {
    done()
  }
}

async function adjustGlobalVar(files) {
  const files = path.join(__dirname, 'dist/cjs/app-globals*.js')
  await replace({
    files: files,
    from: `const global =`,
    to: `const globalImport =`,
  })
  const results = await replace({
    files: files,
    from: `const globalScripts = global.globalScript;`,
    to: `const globalScripts = globalImport.globalScript;`,
  })
  const changedFiles = results.filter(r => r.hasChanged).map(r => r.file)
  changedFiles.forEach(f => log.list(f))
}

run()
