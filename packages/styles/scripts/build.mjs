import { done, logger } from '../../../scripts/utils.mjs'
import { generateBackgroundColors } from './background.mjs'
import { generateBorder } from './border.mjs'
import { generateElevation } from './elevation.mjs'
import { generateFlex } from './flex.mjs'
import { generateLayout } from './layout.mjs'
import { generateSpacing } from './spacing.mjs'
import { generateTypography } from './typography.mjs'

const run = async () => {
  const log = logger('styles build')
  log.start()

  try {
    await generateBackgroundColors()
    await generateBorder()
    await generateElevation()
    await generateFlex()
    await generateLayout()
    await generateSpacing()
    await generateTypography()
    log.succeed()
  } catch (error) {
    log.fail(error)
  } finally {
    done()
  }
}

run()
