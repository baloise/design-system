import { copy } from 'fs-extra'
import { mkdir, rm, writeFile } from 'fs/promises'
import { join, relative } from 'path'
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

    await mkdir(join(options.projectRoot, 'css'))

    // create css output
    const files = await scan(join(options.projectRoot, 'sass', '**', '*.scss'))
    for (let index = 0; index < files.length; index++) {
      const file = files[index]
      await compileSass(file, options)
    }

    // create component style output
    const components = await scan(join(options.componentRoot, '**', '*.style.scss'))
    for (let index = 0; index < components.length; index++) {
      const component = components[index]
      await compileSass(component, { ...options, folderPath: 'components' })
    }

    // create components all output
    await compileSassToMergedFile(components, 'all.css', { ...options, folderPath: 'components' })

    // copy generated files to css folder
    await copy(join(options.projectRoot, 'css'), join(options.projectRoot, '..', 'core', 'www', 'assets', 'styles'))
  } catch (error) {
    console.error(error)
    return { success: false }
  }

  return { success: true }
}
