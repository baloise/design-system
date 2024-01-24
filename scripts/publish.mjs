import { fileURLToPath } from 'url'
import path from 'path'
import { readdir } from 'fs/promises'
import { done, logger, copy } from './utils.mjs'

const __filename = fileURLToPath(import.meta.url)
const __root = path.join(path.dirname(__filename), '..')

const run = async () => {
  const log = logger('publish')
  log.start()

  const packagesPath = path.join(__root, 'packages')
  const packages = (await readdir(packagesPath, { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory() && dirent.name !== 'output-targets')
    .map(dirent => dirent.name)

  try {
    for (let index = 0; index < packages.length; index++) {
      const packageName = packages[index]
      await copy(path.join(__root, 'LICENSE'), path.join(__root, 'packages', packageName, 'LICENSE'))
      await copy(path.join(__root, 'README.md'), path.join(__root, 'packages', packageName, 'README.md'))
    }

    log.succeed()
  } catch (error) {
    log.fail(error)
  } finally {
    done()
  }
}

run()
