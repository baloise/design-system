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
const file = require('../../../.scripts/file')
const log = require('../../../.scripts/log')
const { NEWLINE } = require('../../../.scripts/constants')

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
          name: 'removeDimensions',
          params: { removeDimensions: true },
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
  await log.title('icons: optimize')

  const pathToSvgs = path.join(__dirname, '../svg/*.svg')
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

  const lines = ['// generated file by .scripts/icon.script.js', '']

  contents.forEach((value, key) => {
    lines.push(`export const bal${upperFirst(camelCase(key))} = '${value}';`)
    lines.push(``)
  })

  await file.save(path.join(__dirname, '../src/icons.ts'), lines.join(NEWLINE))
  await file.save(
    path.join(__dirname, '../docs/icons.json'),
    JSON.stringify([...contents.keys()].map(c => c.replace('icon-', ''))),
  )
}

main()
