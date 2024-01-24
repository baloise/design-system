import { fileURLToPath } from 'url'
import shell from 'shelljs'
import path from 'path'
import { done, logger, writeFile, makeDir, copy } from '../../scripts/utils.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.join(path.dirname(__filename), '..')
const __root = path.join(path.dirname(__filename), '../..')
const __generated = path.join(__dirname, 'generated')

const run = async () => {
  const log = logger('e2e build')
  log.start()

  try {
    await makeDir(__generated)
    shell.rm('-rf', 'generated/www')
    shell.rm('-rf', 'generated/dist')
    shell.rm('-rf', 'generated/components')
    await copy(path.join(__root, 'packages/components/www'), path.join(__generated, 'www'))
    await copy(path.join(__root, 'packages/components/dist'), path.join(__generated, 'dist'))
    await copy(path.join(__root, 'packages/components/components'), path.join(__generated, 'components'))
    await writeFile(path.join(__generated, 'index.d.ts'), `export * from './dist/types';`)
    log.succeed()
  } catch (error) {
    log.fail(error)
  } finally {
    done()
  }
}

run()
