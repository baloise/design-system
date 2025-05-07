import { rm } from 'fs/promises'
import { join } from 'path'
import { generateSpacing } from './generators/spacing'
import { BuildTailwindcssExecutorSchema } from './schema'

export default async function runExecutor(options: BuildTailwindcssExecutorSchema) {
  try {
    console.log('tailwindcss', options)
    // clean generated files
    await rm(join(options.projectRoot, 'css'), { recursive: true, force: true })

    let utilContent = ``
    utilContent += await generateSpacing(options)

    console.log('utilContent', utilContent)
    // create css output
    // await mkdir(join(options.projectRoot, 'css'))
    // const files = await scan(join(options.projectRoot, 'sass', '**', '*.sass'))
    // for (let index = 0; index < files.length; index++) {
    //   const file = files[index]
    //   await compileSass(file, options)
    // }
  } catch (error) {
    console.error(error)
    return { success: false }
  }

  return { success: true }
}
