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
  const log = logger('icons build')
  log.start()

  try {
    shell.rm('-rf', 'dist')

    await optimizeSvg()
    await exec('rollup', ['--config', 'rollup.config.js'])

    shell.cp('src/icons.json', 'dist')
    shell.rm('-f', 'src/icons.json')

    log.succeed()
  } catch (error) {
    log.fail(error)
  } finally {
    done()
  }
}

async function optimizeSvg() {
  // Search for all svg file paths
  const filePaths = await scan(path.join(__dirname, 'svg/*.svg'))

  // Read the svg file and optimize it
  const contents = new Map()
  for (let index = 0; index < filePaths.length; index++) {
    try {
      const filePath = filePaths[index]
      const fileName = path.parse(filePath).name
      const svgContent = await readFile(filePath)
      const optimizedSvgContent = await optimizeIcon(svgContent)
      contents.set(fileName, optimizedSvgContent)
      await writeFile(path.join(__dirname, 'svg', `${fileName}.svg`), optimizedSvgContent)
    } catch (error) {
      reject(error.message)
    }
  }

  // Generate JS output
  const lines = ['/* eslint-disable prettier/prettier */', '// generated file', '']
  const regex = /[\r\n]+/g // remove all line breaks
  contents.forEach((value, key) => {
    lines.push(`export const balIcon${upperFirst(camelCase(key))} = /*#__PURE__*/ '${value.replace(regex, '')}';`)
    lines.push(``)
  })

  await writeFile(path.join(__dirname, 'src/index.ts'), lines.join(NEWLINE))
  await writeFile(path.join(__dirname, 'src/icons.json'), JSON.stringify([...contents.keys()]))

  // Generate DS min-set of icons output
  const dsLines = ['/* eslint-disable prettier/prettier */', '// generated file', '']
  const dsIcons = [
    'balIconClose',
    'balIconInfoCircle',
    'balIconPlus',
    'balIconMinus',
    'balIconNavGoLeft',
    'balIconNavGoRight',
    'balIconNavGoDown',
    'balIconNavGoUp',
    'balIconCaretUp',
    'balIconCaretRight',
    'balIconCaretDown',
    'balIconCaretLeft',
    'balIconCheck',
    'balIconDate',
    'balIconDocument',
    'balIconEdit',
    'balIconTrash',
    'balIconUpload',
    'balIconMenuBars',
    'balIconFacebook',
    'balIconInstagram',
    'balIconXing',
    'balIconLinkedin',
    'balIconTwitter',
    'balIconX',
    'balIconYoutube',
    'balIconWeb',
  ]

  contents.forEach((value, key) => {
    const iconName = `balIcon${upperFirst(camelCase(key))}`
    if (dsIcons.includes(iconName)) {
      dsLines.push(`export const ${iconName} = /*#__PURE__*/ '${value}';`)
      dsLines.push(``)
    }
  })

  await writeFile(path.join(__dirname, '../components/src/utils/constants/icons.constant.ts'), dsLines.join(NEWLINE))
}

async function optimizeIcon(input) {
  const svg = await svgo.optimize(input, {
    plugins: [
      {
        name: 'removeAttrs',
        params: { attrs: '(stroke|fill)' },
      },
      {
        name: 'removeStyleElement',
      },
      {
        name: 'removeDimensions',
        params: { removeDimensions: true },
      },
      {
        name: 'addAttributesToSVGElement',
        params: {
          attributes: [
            {
              focusable: false,
            },
            {
              'aria-hidden': 'true',
            },
          ],
        },
      },
    ],
  })
  return svg.data.replace(/style="fill: #000000"/g, '').replace(/style="fill:#000000"/g, '')
}

run()
