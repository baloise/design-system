import { fileURLToPath } from 'url'
import shell from 'shelljs'
import svgo from 'svgo'
import path from 'path'
import camelCase from 'lodash.camelcase'
import upperFirst from 'lodash.upperfirst'
import { done, logger, scan, readFile, writeFile, NEWLINE, exec } from '../../../scripts/utils.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.join(path.dirname(__filename), '..')

const run = async () => {
  const log = logger('maps build')
  log.start()

  try {
    shell.rm('-rf', 'dist')

    await optimizeSvg()
    await exec('rollup', ['--config', 'rollup.config.js'])

    log.succeed()
  } catch (error) {
    log.fail(error)
  } finally {
    done()
  }
}

async function optimizeSvg() {
  // Search for all svg file paths
  const filePaths = await scan(path.join(__dirname, 'markers/*.svg'))

  // Read the svg file and optimize it
  const contents = new Map()
  for (let index = 0; index < filePaths.length; index++) {
    try {
      const filePath = filePaths[index]
      const fileName = path.parse(filePath).name
      const svgContent = await readFile(filePath)
      const optimizedSvgContent = await optimizeIcon(svgContent)
      contents.set(fileName, optimizedSvgContent)
    } catch (error) {
      reject(error.message)
    }
  }

  // Generate JS output
  const lines = ['/* eslint-disable prettier/prettier */', '// generated file', '']
  const regex = /[\r\n]+/g // remove all line breaks
  contents.forEach((value, key) => {
    lines.push(
      `export const balMapMarker${upperFirst(
        camelCase(key),
      )} = /*#__PURE__*/ 'data:image/svg+xml;utf-8, ${value.replace(regex, '')}';`,
    )
    lines.push(``)
  })

  await writeFile(path.join(__dirname, 'src/markers.ts'), lines.join(NEWLINE))
}

async function optimizeIcon(input) {
  const svg = await svgo.optimize(input, {
    plugins: [
      {
        name: 'preset-default',
        active: false,
      },
    ],
  })
  return svg.data
}

run()
