import shell from 'shelljs'
import { done, logger, exec } from '../../../.build/utils/index.mjs'

const run = async () => {
  const log = logger('testing build')
  log.start()

  try {
    shell.rm('-rf', 'dist')

    await exec('tsc', [
      '--outDir',
      'dist',
      '--skipLibCheck',
      '--declaration',
      '--target',
      'es5',
      '--moduleResolution',
      'node',
    ])

    log.succeed()
  } catch (error) {
    log.fail(error)
  } finally {
    done()
  }
}

run()
