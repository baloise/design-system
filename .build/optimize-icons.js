/**
 * optimize svg icons
 * --------------------------------------
 * This script reads the svg icons and optimizes them. For each
 * svg icon a web components gets generated
 */

const path = require('path')
const svgo = require('svgo')
const camelCase = require('lodash.camelcase')
const upperFirst = require('lodash.upperfirst')
const file = require('./file')
const log = require('./log')
const { NEWLINE } = require('./constants')

const DIRNAME = path.normalize(__dirname);
const PACKAGE = path.join(DIRNAME, "../packages/icons");

const readSVG = async (name, filePath) => {
  let svgContent = ''
  try {
    svgContent = await file.read(filePath)
  } catch (error) {
    log.error(`Could not read the file ${filePath}`, error)
    process.exit(0)
  }

  try {
    const svg = await svgo.optimize(svgContent, {
      plugins: [
        {
          name: 'removeAttrs',
          params: { attrs: '(stroke|fill)' },
        },
        {
          name: 'removeStyleElement'
        },
        {
          name: 'removeDimensions',
          params: { removeDimensions: true },
        },
      ],
    })
    svgContent = svg.data
    svgContent = svgContent.replace(/style="fill: #000000"/g, '').replace(/style="fill:#000000"/g, '');
  } catch (error) {
    log.error(`Could not optimize the file ${filePath}`, error)
    process.exit(0)
  }

  return svgContent
}

const main = async () => {
  await log.title('icons: optimize')

  const pathToSvgs = path.join(PACKAGE, 'src/assets/*.svg')
  let filePaths = []
  try {
    filePaths = await file.scan(pathToSvgs)
  } catch (error) {
    log.error(`Could not find any files with the pattern = ${pathToSvgs}`, error)
  }

  log.info(`Found ${filePaths.length} SVG files.`)

  const contents = new Map()
  for (let index = 0; index < filePaths.length; index++) {
    const filePath = filePaths[index]
    const fileName = path.parse(filePath).name
    svgContent = await readSVG(fileName, filePath)
    contents.set(fileName, svgContent)
    await file.save(path.join(PACKAGE, 'src/assets', `${fileName}.svg`), svgContent)
  }

  const lines = [
    '/* eslint-disable prettier/prettier */',
    '// generated file by .build/optimize-icons.js',
    '',
  ]

  contents.forEach((value, key) => {
    lines.push(`export const balIcon${upperFirst(camelCase(key))} = '${value}';`)
    lines.push(``)
  })

  await file.save(path.join(PACKAGE, 'src/index.ts'), lines.join(NEWLINE))
  await file.save(
    path.join(PACKAGE, 'src/icons.json'),
    JSON.stringify([...contents.keys()]),
  )

  contents.forEach(async (value, key) => {
    await file.save(path.join(PACKAGE, 'src/assets', `${key}.svg`), value, false)
  })
}

main()
