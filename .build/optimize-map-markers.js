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
const file = require('./utils/file')
const log = require('./utils/log')
const { NEWLINE } = require('./utils/constants')

const DIRNAME = path.normalize(__dirname);
const PACKAGE = path.join(DIRNAME, "../packages/maps");

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
          name: 'preset-default',
          active: false,
        },
      ],
    })
    svgContent = svg.data
  } catch (error) {
    log.error(`Could not optimize the file ${filePath}`, error)
    process.exit(0)
  }

  return svgContent
}

const main = async () => {
  await log.title('map markers: optimize')

  const pathToSvgs = path.join(PACKAGE, 'markers/*.svg')
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
  }

  const lines = [
    '/* eslint-disable prettier/prettier */',
    '// generated file by .build/optimize-icons.js',
    '',
  ]

  contents.forEach((value, key) => {
    lines.push(`export const balMapMarker${upperFirst(camelCase(key))} = /*#__PURE__*/ 'data:image/svg+xml;utf-8, ${value}';`)
    lines.push(``)
  })

  await file.save(path.join(PACKAGE, 'src/markers.ts'), lines.join(NEWLINE))


}

main()
