import { BuildSvgExecutorSchema } from './schema'
import { NEWLINE, scan } from '../utils'
import { dirname, join, parse } from 'path'
import { mkdir, readFile, writeFile } from 'fs/promises'
import camelCase from 'lodash.camelcase'
import upperFirst from 'lodash.upperfirst'
import svgo from 'svgo'

export default async function runSvgExecutor(options: BuildSvgExecutorSchema) {
  try {
    const files = await optimizeFiles(options)

    if (options.jsOutput) {
      await writeJsOutput(files, options)
    }

    // eslint-disable-next-line no-extra-boolean-cast
    if (!!options.jsonPath) {
      await writeJsonOutput(files, options)
    }

    // eslint-disable-next-line no-extra-boolean-cast
    if (!!options.dsMinSetPath) {
      await writeDSMinSet(files, options)
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

async function optimizeFiles(options: BuildSvgExecutorSchema): Promise<Map<string, string>> {
  // Search for all svg file paths
  const files = await scan(join(options.projectRoot, 'src', 'assets', '*.svg'))

  // Read the svg file and optimize it
  const contents = new Map<string, string>()
  for (let index = 0; index < files.length; index++) {
    const file = files[index]
    const fileName = parse(file).name
    const content = await readFile(file, 'utf-8')
    const optimizedSvgContent = await optimizeSvg(content, options)
    if (options.svgOptimize) {
      await writeFile(file, optimizedSvgContent)
    }
    contents.set(fileName, optimizedSvgContent)
  }

  return contents
}

async function optimizeSvg(content: string, options: BuildSvgExecutorSchema) {
  if (options.svgOptimize) {
    const svg = await svgo.optimize(content, {
      plugins: options.svgPlugins || [],
    })
    if (options.svgReplaceBlack) {
      return svg.data.replace(/style="fill: #000000"/g, '').replace(/style="fill:#000000"/g, '')
    }
    return svg.data
  }
  return content
}

async function writeJsOutput(files: Map<string, string>, options: BuildSvgExecutorSchema) {
  const lines = ['// generated file', '']
  const regex = /[\r\n]+/g // remove all line breaks

  files.forEach((value, key) => {
    lines.push(
      `export const ${options.jsOutputName}${upperFirst(camelCase(key))} = '${options.jsInlineData ? 'data:image/svg+xml;utf-8, ' : ''}${value.replace(regex, '')}';`,
    )
    lines.push(``)
  })

  await mkdir(dirname(join(options.projectRoot, options.jsOutputPath)), { recursive: true })
  await writeFile(join(options.projectRoot, options.jsOutputPath), lines.join(NEWLINE))
}

async function writeJsonOutput(files: Map<string, string>, options: BuildSvgExecutorSchema) {
  const content = JSON.stringify([...files.keys()], undefined, 2)

  await mkdir(dirname(join(options.projectRoot, options.jsonPath)), { recursive: true })
  await writeFile(join(options.projectRoot, options.jsonPath), content)
}

async function writeDSMinSet(files: Map<string, string>, options: BuildSvgExecutorSchema) {
  const lines = ['// generated file', '']
  const regex = /[\r\n]+/g // remove all line breaks

  files.forEach((value, key) => {
    const iconName = `${options.jsOutputName}${upperFirst(camelCase(key))}`
    if ((options.dsMinSet || []).includes(iconName)) {
      lines.push(
        `export const ${iconName} = '${options.jsInlineData ? 'data:image/svg+xml;utf-8, ' : ''}${value.replace(regex, '')}';`,
      )
      lines.push(``)
    }
  })

  await mkdir(dirname(join(options.projectRoot, options.dsMinSetPath)), { recursive: true })
  await writeFile(join(options.projectRoot, options.dsMinSetPath), lines.join(NEWLINE))
}
