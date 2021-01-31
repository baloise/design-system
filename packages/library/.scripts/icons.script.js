/**
 * utils - docs-json
 * --------------------------------------
 * This script reads the defined filter functions and creates
 * a JSON file with all the meta information for documentation
 * and code generations.
 */

const path = require('path')
const SVGO = require('svgo')
const file = require('../../../.scripts/file')
const log = require('../../../.scripts/log')
const { toPascalCase } = require('../../../.scripts/string')
const { NEWLINE } = require('../../../docs/.scripts/utils/constants')

const svgo = new SVGO({
  plugins: [
    {
      removeAttrs: { attrs: '(stroke|fill)' },
    },
    {
      removeDimensions: true,
    },
  ],
})

const iconComponent = (tag, className, svgContent) => `import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'bal-${tag}',
  styleUrl: '../bal-icon-svg.scss',
  shadow: false,
  scoped: true,
})
export class ${className} {
  /**
   * Defines the size of the icon.
   */
  @Prop() size: 'xsmall' | 'small' | 'medium' | 'large' | '' = ''

  render() {
    return (
      <Host class={{ [\`is-size-\${this.size}\`]: !!this.size }}>
        ${svgContent}
      </Host>
    );
  }
}
`

const generateScgComponent = async (name, filePath) => {
  let svgContent = ''
  try {
    svgContent = await file.read(filePath)
  } catch (error) {
    log.error(`Could not read the file ${filePath}`, error)
    process.exit(0)
  }

  try {
    const svg = await svgo.optimize(svgContent)
    svgContent = svg.data
  } catch (error) {
    log.error(`Could not optimize the file ${filePath}`, error)
    process.exit(0)
  }

  const component = iconComponent(name, toPascalCase(name), svgContent)
  await file.makeDir(path.join(__dirname, `../src/components/bal-icon/icons`))
  await file.save(path.join(__dirname, `../src/components/bal-icon/icons/bal-${name}.tsx`), component)
}

const run = async () => {
  await log.title('library : icons')

  const pathToSvgs = path.join(__dirname, '../src/components/bal-icon/svg/*.svg')
  let filePaths = []
  try {
    filePaths = await file.scan(pathToSvgs)
  } catch (error) {
    log.error(`Could not find any files with the pattern = ${pathToSvgs}`, error)
  }

  log.info(`Found ${filePaths.length} SVG files.`)

  let tableContent = ['| Icon | Name |', '| ---- | ---- |']
  for (let index = 0; index < filePaths.length; index++) {
    const filePath = filePaths[index]
    const fileName = path.parse(filePath).name
    await generateScgComponent(fileName, filePath)
    const iconName = fileName.replace('icon-', '')
    tableContent.push(`| <bal-icon name="${iconName}" /> | \`${iconName}\` |`)
  }

  let readme
  const pathToReadme = path.join(__dirname, '../src/components/bal-icon/readme.md')
  try {
    readme = await file.read(pathToReadme)
  } catch (error) {
    log.error(`Could not find file = ${pathToReadme}`, error)
  }

  const lines = readme.split(NEWLINE).map(line => line.replace('\r', '').trim())
  const startIndex = lines.indexOf('<!-- Auto Generated Icons -->')
  const endIndex = lines.indexOf('<!-- Auto Generated Below -->')

  const newLines = []
  for (let index = 0; index < lines.length; index++) {
    const line = lines[index]
    if (index <= startIndex || index >= endIndex) {
      newLines.push(line)
    }

    if (index === startIndex) {
      newLines.push('')
      tableContent.forEach(tc => newLines.push(tc))
    }
  }

  await file.save(pathToReadme, newLines.join(NEWLINE))
}

run()
