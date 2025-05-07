import { mkdir, rm, writeFile } from 'fs/promises'
import { join } from 'path'
import { generateBorder } from './generators/border'
import { generateTypography } from './generators/typography'
import { NEWLINE } from './generators/utils'
import { generateZIndex } from './generators/z-index'
import { BuildTailwindcssExecutorSchema } from './schema'
import { generateLineHeight } from './generators/line-height'
import { generateSpacing } from './generators/spacing'

export default async function runExecutor(options: BuildTailwindcssExecutorSchema) {
  try {
    let content = `@layer utilities {${NEWLINE}${NEWLINE}`
    content += await generateSpacing(options)
    content += await generateZIndex(options)
    content += await generateBorder(options)
    content += await generateTypography(options)
    content += await generateLineHeight(options)
    content += `}${NEWLINE}${NEWLINE}`

    console.log('content', content)

    // create css output
    await rm(join(options.projectRoot, 'css'), { recursive: true, force: true })
    await mkdir(join(options.projectRoot, 'css'))
    await writeFile(join(options.projectRoot, 'css', `utilities.css`), content)
  } catch (error) {
    console.error(error)
    return { success: false }
  }

  return { success: true }
}
