import { done, logger, exec } from '../../../scripts/utils.mjs'

const run = async () => {
  const log = logger('react components build')
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
