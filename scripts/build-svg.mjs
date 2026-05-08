import { mkdir, readFile, writeFile } from 'fs/promises'
import { glob } from 'glob'
import { createRequire } from 'module'
import { dirname, join, parse, resolve } from 'path'
import { fileURLToPath } from 'url'
import { optimize } from 'svgo'

const require = createRequire(import.meta.url)
const camelCase = require('lodash/camelCase')
const upperFirst = require('lodash/upperFirst')

const __dirname = dirname(fileURLToPath(import.meta.url))
const assetsRoot = resolve(__dirname, '../packages/assets')
const coreRoot = resolve(__dirname, '../packages/core')

const NEWLINE = '\n'

const SVG_GROUND_COLOR = '#000D6E'
const SUB_PACKAGES = ['maps', 'icons', 'brand-icons']

const DS_MIN_SET_ICONS = [
  'IconBell',
  'IconInformation',
  'IconAlert',
  'IconAlertTriangle',
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

async function scan(pattern) {
  return glob(pattern.replace(/\\/g, '/'))
}

async function optimizeSvg(content) {
  const result = optimize(content, { plugins: [] })
  return result.data
    .replace(/style="fill: #000000"/g, `style="fill: ${SVG_GROUND_COLOR}"`)
    .replace(/style="fill:#000000"/g, `style="fill:${SVG_GROUND_COLOR}"`)
}

async function optimizeFiles(filePaths) {
  const contents = new Map()
  for (const file of filePaths) {
    const fileName = parse(file).name
    const content = await readFile(file, 'utf-8')
    const optimized = await optimizeSvg(content)
    await writeFile(file, optimized)
    contents.set(fileName, optimized)
  }
  return contents
}

function buildJsOutput(subPackage, files, filterIcons) {
  const lines = ['// generated file', '']
  const regex = /[\r\n]+/g
  const singular = subPackage.endsWith('s') ? subPackage.slice(0, -1) : subPackage

  for (const [key, value] of files) {
    const exportName = `${upperFirst(camelCase(singular))}${upperFirst(camelCase(key))}`
    if (filterIcons && !filterIcons.includes(exportName)) continue
    lines.push(`export const ${exportName} = '${value.replace(regex, '')}';`)
    lines.push('')
  }

  return lines.join(NEWLINE)
}

async function processSubPackage(subPackage) {
  const subPackageRoot = join(assetsRoot, 'src', subPackage)
  await mkdir(subPackageRoot, { recursive: true })

  const svgPaths = await scan(join(subPackageRoot, 'svg', '*.svg'))
  const svgs = await optimizeFiles(svgPaths)

  await writeFile(join(subPackageRoot, 'svg.ts'), buildJsOutput(subPackage, svgs))
  await writeFile(join(subPackageRoot, 'svg.json'), JSON.stringify([...svgs.keys()], undefined, 2))

  if (subPackage === 'icons') {
    const destPath = join(coreRoot, 'src/utils/constants/icons.constant.ts')
    await mkdir(dirname(destPath), { recursive: true })
    await writeFile(destPath, buildJsOutput(subPackage, svgs, DS_MIN_SET_ICONS))
  }
}

for (const subPackage of SUB_PACKAGES) {
  await processSubPackage(subPackage)
}
