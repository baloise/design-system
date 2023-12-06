import { done, logger, exec } from '../../../.build/utils/index.mjs'

const run = async () => {
  const log = logger('table build')
  log.start()

  try {
    await exec('rollup', ['--config', 'rollup.config.js'])
    log.succeed()
  } catch (error) {
    log.fail(error)
  } finally {
    done()
  }
}

run()
