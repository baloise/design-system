import { join } from 'path'
import { mkdir, rm } from 'fs/promises'
import { BuildCssExecutorSchema } from './schema'
import { compileSass, scan } from '../utils'

export default async function runExecutor(options: BuildCssExecutorSchema) {
  try {
    await rm(join(options.projectRoot, 'css'), { recursive: true, force: true })

    // create css output
    await mkdir(join(options.projectRoot, 'css'))
    const files = await scan(join(options.projectRoot, 'sass', '**', '*.sass'))
    for (let index = 0; index < files.length; index++) {
      const file = files[index]
      await compileSass(file, options)
    }
  } catch (error) {
    console.error(error)
    return { success: false }
  }

  return { success: true }
}
