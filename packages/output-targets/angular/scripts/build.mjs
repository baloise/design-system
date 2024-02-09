import shell from 'shelljs'
import { exec, done, logger } from '../../../../scripts/utils.mjs'

const run = async () => {
  const log = logger('angular output')
  log.start()

  try {
    shell.rm('-rf', 'dist')
    await exec('rollup', ['--config', 'rollup.config.js'])
    log.succeed()
  } catch (error) {
    log.fail(error)
  } finally {
    done()
  }
}

run()
