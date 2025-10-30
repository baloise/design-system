import { copy } from 'fs-extra'
import { mkdir, rm } from 'fs/promises'
import { join } from 'path'
import { compileSass, scan } from '../utils'
import { generateBackgroundColors } from './generators/background'
import { generateBorder } from './generators/border'
import { generateElevation } from './generators/elevation'
import { generateFlex } from './generators/flex'
import { generateInteractions } from './generators/interactions'
import { generateLayout } from './generators/layout'
import { generateSizing } from './generators/sizing'
import { generateSpacing } from './generators/spacing'
import { generateTypography } from './generators/typography'
import { BuildStylesExecutorSchema } from './schema'

export default async function runExecutor(options: BuildStylesExecutorSchema) {
  try {
    // clean generated files
    await rm(join(options.projectRoot, 'css'), { recursive: true, force: true })
    await rm(join(options.projectRoot, 'docs'), { recursive: true, force: true })
    await rm(join(options.projectRoot, 'src/generated'), { recursive: true, force: true })

    // generate css utils
    await generateBackgroundColors(options)
    await generateBorder(options)
    await generateElevation(options)
    await generateFlex(options)
    await generateInteractions(options)
    await generateLayout(options)
    await generateSizing(options)
    await generateSpacing(options)
    await generateTypography(options)

    // create css output
    await mkdir(join(options.projectRoot, 'css'))
    const files = await scan(join(options.projectRoot, 'sass', '**', '*.sass'))
    for (let index = 0; index < files.length; index++) {
      const file = files[index]
      await compileSass(file, options)
    }

    // copy generated files to css folder
    await copy(
      join(options.projectRoot, 'css', 'themes', 'tcs.css'),
      join(options.projectRoot, '..', 'core', 'www', 'assets', 'tcs.css'),
    )
    await copy(
      join(options.projectRoot, 'css', 'themes', 'santander.css'),
      join(options.projectRoot, '..', 'core', 'www', 'assets', 'santander.css'),
    )
    await copy(
      join(options.projectRoot, 'css', 'themes', 'future.css'),
      join(options.projectRoot, '..', 'core', 'www', 'assets', 'future.css'),
    )
  } catch (error) {
    console.error(error)
    return { success: false }
  }

  return { success: true }
}
