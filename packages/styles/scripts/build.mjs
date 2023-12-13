import shell from 'shelljs'
import { done, exec, logger } from '../../../scripts/utils.mjs'

import { generateBackgroundColors } from './background.mjs'
import { generateBorder } from './border.mjs'
import { generateElevation } from './elevation.mjs'
import { generateInteractions } from './interactions.mjs'
import { generateFlex } from './flex.mjs'
import { generateLayout } from './layout.mjs'
import { generateSizing } from './sizing.mjs'
import { generateSpacing } from './spacing.mjs'
import { generateTypography } from './typography.mjs'

const run = async () => {
  const log = logger('styles build')
  log.start()

  try {
    // clean generated files
    shell.rm('-rf', 'css')
    shell.rm('-rf', 'docs')
    shell.rm('-rf', 'src/generated')

    // generate css utils
    await generateBackgroundColors()
    await generateBorder()
    await generateElevation()
    await generateInteractions()
    await generateFlex()
    await generateLayout()
    await generateSizing()
    await generateSpacing()
    await generateTypography()

    await exec('sass', ['--load-path=../../node_modules', '--embed-sources', './sass:./css'])
    await exec('postcss', ['./css/*.css', '--use', 'autoprefixer', '-d', './css/'])
    await exec('cleancss', ['-O2', '--batch', '--batch-suffix', '.min', 'css/**/*.css'])

    log.succeed()
  } catch (error) {
    log.fail(error)
  } finally {
    done()
  }
}

run()
