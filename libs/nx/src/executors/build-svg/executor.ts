import { mkdir, readFile, writeFile } from 'fs/promises'
import camelCase from 'lodash/camelCase'
import upperFirst from 'lodash/upperFirst'
import { dirname, join, parse } from 'path'
import svgo from 'svgo'
import { NEWLINE, scan } from '../utils'
import { BuildSvgExecutorSchema } from './schema'

export default async function runSvgExecutor(options: BuildSvgExecutorSchema) {
  try {
    if (options.subPackages && options.subPackages.length > 0) {
      for (const subPackage of options.subPackages) {
        const subPackageRoot = join(options.projectRoot, 'src', subPackage)
        const svgFilePaths = join(subPackageRoot, 'svg', '*.svg')

        await mkdir(subPackageRoot, { recursive: true })
        const svgPaths = await scan(svgFilePaths)
        const svgs = await optimizeFiles(svgPaths, options)
        const content = await buildJsOutput(subPackage, svgs)
        await writeFile(join(subPackageRoot, 'svg.ts'), content)
        await writeJsonOutput(subPackageRoot, svgs, options)

        // We need to create the min set of icons for the core of the design system
        // so we can export the js export directly to the core package.
        if (subPackage === 'icons') {
          const dsMinSetPath = '../core/src/utils/constants/icons.constant.ts'
          const dsMinSetFullPath = join(options.projectRoot, dsMinSetPath)
          await mkdir(dirname(dsMinSetFullPath), { recursive: true })

          const dsMinSetIcons = [
            'IconBell',
            'IconInformation',
            'IconAlert',
            'IconFile',
            'IconPicture',
            'IconVideo',
            'IconAudio',
            'IconClock',
            'IconClose',
            'IconInfoCircle',
            'IconLink',
            'IconPlus',
            'IconMinus',
            'IconNavGoLeft',
            'IconNavGoRight',
            'IconNavGoDown',
            'IconNavGoUp',
            'IconCaretUp',
            'IconCaretRight',
            'IconCaretDown',
            'IconCaretLeft',
            'IconCheck',
            'IconDate',
            'IconDocument',
            'IconDownload',
            'IconEdit',
            'IconTrash',
            'IconUpload',
            'IconMenuBars',
            'IconFacebook',
            'IconInstagram',
            'IconXing',
            'IconLinkedin',
            'IconTwitter',
            'IconX',
            'IconYoutube',
            'IconWeb',
          ]

          const content = await buildJsOutput(subPackage, svgs, dsMinSetIcons)

          await writeFile(dsMinSetFullPath, content)
        }
      }
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
    }
  }

  return {
    success: true,
  }
}

async function optimizeFiles(filePaths: string[], options: BuildSvgExecutorSchema): Promise<Map<string, string>> {
  // Read the svg file and optimize it
  const contents = new Map<string, string>()
  for (let index = 0; index < filePaths.length; index++) {
    const file = filePaths[index]
    const fileName = parse(file).name
    const content = await readFile(file, 'utf-8')
    const optimizedSvgContent = await optimizeSvg(content, options)
    await writeFile(file, optimizedSvgContent)
    contents.set(fileName, optimizedSvgContent)
  }

  return contents
}

async function optimizeSvg(content: string, options: BuildSvgExecutorSchema) {
  const svg = await svgo.optimize(content, {
    plugins: options.svgPlugins || [],
  })
  if (options.svgReplaceBlack) {
    const groundColor = options.svgGroundColor ?? '#000D6E'
    return svg.data
      .replace(/style="fill: #000000"/g, `style="fill: ${groundColor}"`)
      .replace(/style="fill:#000000"/g, `style="fill:${groundColor}"`)
  }
  return svg.data
}

async function buildJsOutput(subPackage: string, files: Map<string, string>, filterIcons?: string[]): Promise<string> {
  const lines = ['// generated file', '']
  const regex = /[\r\n]+/g // remove all line breaks

  for (const [key, value] of files) {
    const name = `${upperFirst(camelCase(key))}`
    // make the subpacke singular if it is plural, e.g. icons -> icon
    const singularSubPackage = subPackage.endsWith('s') ? subPackage.slice(0, -1) : subPackage
    const exportName = `${upperFirst(camelCase(singularSubPackage))}${name}`
    if (filterIcons && !filterIcons.includes(exportName)) {
      continue
    }
    lines.push(`export const ${exportName} = '${value.replace(regex, '')}';`)
    lines.push(``)
  }

  return lines.join(NEWLINE)
}

async function writeJsonOutput(subPackageRoot: string, files: Map<string, string>, options: BuildSvgExecutorSchema) {
  const content = JSON.stringify([...files.keys()], undefined, 2)

  await writeFile(join(subPackageRoot, 'svg.json'), content)
}
