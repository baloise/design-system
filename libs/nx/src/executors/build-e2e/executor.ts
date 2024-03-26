import { join } from 'path'
import { BuildE2eExecutorSchema } from './schema'
import { mkdir, rm, writeFile } from 'fs/promises'
import { copy } from 'fs-extra'

export default async function runExecutor(options: BuildE2eExecutorSchema) {
  try {
    const generatedPath = join(options.projectRoot, 'generated')
    await mkdir(generatedPath, { recursive: true })
    await rm(join(generatedPath, 'www'), { force: true, recursive: true })
    await rm(join(generatedPath, 'dist'), { force: true, recursive: true })
    await rm(join(generatedPath, 'components'), { force: true, recursive: true })
    await rm(join(generatedPath, 'components-data.json'), { force: true, recursive: true })

    const corePath = join(options.projectRoot, '..', 'packages', 'core')
    await copy(join(corePath, 'www'), join(generatedPath, 'www'))
    await copy(join(corePath, 'dist'), join(generatedPath, 'dist'))
    await copy(join(corePath, 'components'), join(generatedPath, 'components'))

    const iconsPath = join(options.projectRoot, '..', 'packages', 'icons')
    await copy(join(iconsPath, 'dist'), join(generatedPath, 'icons'))

    const resourcePath = join(options.projectRoot, '..', 'resources', 'data')
    await copy(join(resourcePath, 'components.json'), join(generatedPath, 'components-data.json'))

    await writeFile(join(generatedPath, 'index.d.ts'), `export * from './dist/types';`)
  } catch (error) {
    console.error(error)
    return { success: false }
  }

  return { success: true }
}
