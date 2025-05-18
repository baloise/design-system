import { mkdir, writeFile } from 'fs/promises'
import { join } from 'path'
import { generateBorder } from './generators/border'
import { generateLineHeight } from './generators/line-height'
import { generateSpacing } from './generators/spacing'
import { generateTypography } from './generators/typography'
import { NEWLINE } from './generators/utils'
import { generateZIndex } from './generators/z-index'
import { BuildTailwindExecutorSchema } from './schema'

export default async function runExecutor(options: BuildTailwindExecutorSchema) {
  try {
    let content = ``
    content += await generateBorder(options)
    content += await generateLineHeight(options)
    content += await generateSpacing(options)
    content += await generateTypography(options)
    content += await generateZIndex(options)
    content += `${NEWLINE}${NEWLINE}`

    // create css output
    try {
      await mkdir(join(options.projectRoot, 'css'), { recursive: true })
    } catch (_e) {
      // ignore error if directory already exists
    }
    await writeFile(join(options.projectRoot, 'css', `utilities.css`), content)
  } catch (error) {
    console.error(error)
    return { success: false }
  }

  return { success: true }
}
