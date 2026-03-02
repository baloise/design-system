import { copy } from 'fs-extra'
import { mkdir, rm, writeFile } from 'fs/promises'
import { join } from 'path'
import { compileSass, compileSassToMergedFile, scan } from '../utils'
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

function formatSeconds(seconds) {
  const endTime = process.hrtime.bigint()
  const elapsedMs = Number(endTime - seconds) / 1e6
  const elapsedSeconds = elapsedMs / 1000
  return elapsedSeconds >= 10 ? `${Math.round(elapsedSeconds)}s` : `${elapsedSeconds.toFixed(2)}s`
}

export default async function runExecutor(options: BuildStylesExecutorSchema) {
  try {
    // clean generated files
    if (!options.dev) {
      await rm(join(options.projectRoot, 'css'), { recursive: true, force: true })
      await rm(join(options.projectRoot, 'docs'), { recursive: true, force: true })
      await rm(join(options.projectRoot, 'src/generated'), { recursive: true, force: true })
    }

    // generate css utils
    if (!options.dev) {
      const startTimeUtilities = process.hrtime.bigint()
      await generateBackgroundColors(options)
      await generateBorder(options)
      await generateElevation(options)
      await generateFlex(options)
      await generateInteractions(options)
      await generateLayout(options)
      await generateSizing(options)
      await generateSpacing(options)
      await generateTypography(options)
      console.log(`Generated utilities in ${formatSeconds(startTimeUtilities)}`)

      await mkdir(join(options.projectRoot, 'css'))
    }

    // create components styles
    const components = await scan(join(options.componentRoot, '**', '*.style.scss'))
    const generatedComponentStylesPath = join(options.projectRoot, 'src', 'generated')
    await mkdir(generatedComponentStylesPath, { recursive: true })
    const componentStyleContent = components
      .map(component => {
        const relativePath = `../../../../${component.replace(/\\/g, '/')}`
        return `@use '${relativePath}';`
      })
      .join('\n')
    await writeFile(join(generatedComponentStylesPath, 'components.scss'), componentStyleContent)

    // create css output
    const startTimeCss = process.hrtime.bigint()

    let files = []
    if (options.dev) {
      console.log('Running in dev mode, only compiling local styles')
      files = await scan(join(options.projectRoot, 'sass', 'baloise-design-system.local.scss'))
    } else {
      files = await scan(join(options.projectRoot, 'sass', '**', '*.scss'))
    }

    await Promise.all(files.map(file => compileSass(file, options)))
    console.log(`Generated css in ${formatSeconds(startTimeCss)}`)

    // copy generated files to css folder
    const startTimeCopy = process.hrtime.bigint()
    if (!options.dev) {
      await rm(join(options.projectRoot, '..', 'core', 'www', 'assets', 'tokens'), { recursive: true, force: true })
      await rm(join(options.projectRoot, '..', 'core', 'www', 'assets', 'styles'), { recursive: true, force: true })
    }

    await copy(
      join(options.projectRoot, '..', 'tokens', 'dist', 'css'),
      join(options.projectRoot, '..', 'core', 'www', 'assets', 'tokens'),
    )
    await copy(join(options.projectRoot, 'css'), join(options.projectRoot, '..', 'core', 'www', 'assets', 'styles'))
    console.log(`Copied styles in ${formatSeconds(startTimeCopy)}`)
  } catch (error) {
    console.error(error)
    return { success: false }
  }

  return { success: true }
}
