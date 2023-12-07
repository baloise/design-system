import { createWriteStream, existsSync, mkdirSync } from 'fs'
import { fileURLToPath } from 'url'
import archiver from 'archiver'
import path from 'path'
import { done, logger, copy } from '../../scripts/utils.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const __root = path.join(__dirname, '../../packages')
const __docs_public = path.join(__dirname, '../public')
const __docs_assets = path.join(__dirname, '../stories/assets')
const __docs_downloads = path.join(__dirname, '../public/assets/download')

const run = async () => {
  const log = logger('doc generating')
  log.start()

  if (!existsSync(__docs_downloads)) {
    mkdirSync(__docs_downloads)
  }

  try {
    await archiveFont()
    await archiveIcons()
    await archiveBrandIcons()
    await archiveMapMarkers()
    await archiveFavicons()
    await archiveFigmaTokens()
    await copyResources()
    log.succeed()
  } catch (error) {
    log.fail(error)
  } finally {
    done()
  }
}

function archiveFont() {
  return new Promise((resolve, reject) => {
    const output = createWriteStream(path.join(__docs_downloads, 'fonts.zip'))
    output.on('close', () => resolve())
    output.on('error', err => reject(err.message))

    const archive = archiver('zip', { zlib: { level: 9 } })
    archive.on('error', err => reject(err.message))
    archive.pipe(output)
    archive.glob('*', { cwd: path.join(__root, 'fonts', 'lib') })
    archive.finalize()
  })
}

function archiveIcons() {
  return new Promise((resolve, reject) => {
    const output = createWriteStream(path.join(__docs_downloads, 'icons.zip'))
    output.on('close', () => resolve())
    output.on('error', err => reject(err.message))

    const archive = archiver('zip', { zlib: { level: 9 } })
    archive.on('error', err => reject(err.message))
    archive.pipe(output)
    archive.glob('*.svg', { cwd: path.join(__root, 'icons', 'svg') })
    archive.finalize()
  })
}

function archiveBrandIcons() {
  return new Promise((resolve, reject) => {
    const output = createWriteStream(path.join(__docs_downloads, 'brand-icons.zip'))
    output.on('close', () => resolve())
    output.on('error', err => reject(err.message))

    const archive = archiver('zip', { zlib: { level: 9 } })
    archive.on('error', err => reject(err.message))
    archive.pipe(output)
    archive.glob('*.svg', { cwd: path.join(__root, 'brand-icons', 'svg') })
    archive.finalize()
  })
}

function archiveMapMarkers() {
  return new Promise((resolve, reject) => {
    const output = createWriteStream(path.join(__docs_downloads, 'map-markers.zip'))
    output.on('close', () => resolve())
    output.on('error', err => reject(err.message))

    const archive = archiver('zip', { zlib: { level: 9 } })
    archive.on('error', err => reject(err.message))
    archive.pipe(output)
    archive.glob('*.svg', { cwd: path.join(__root, 'maps', 'markers') })
    archive.finalize()
  })
}

function archiveFavicons() {
  return new Promise((resolve, reject) => {
    const output = createWriteStream(path.join(__docs_downloads, 'favicons.zip'))
    output.on('close', () => resolve())
    output.on('error', err => reject(err.message))

    const archive = archiver('zip', { zlib: { level: 9 } })
    archive.on('error', err => reject(err.message))
    archive.pipe(output)
    archive.directory(path.join(__root, 'favicons', 'icons/primary'), 'favicons/primary')
    archive.directory(path.join(__root, 'favicons', 'icons/white'), 'favicons/white')
    archive.directory(path.join(__root, 'favicons', 'icons/green'), 'favicons/green')
    archive.directory(path.join(__root, 'favicons', 'icons/purple'), 'favicons/purple')
    archive.directory(path.join(__root, 'favicons', 'icons/red'), 'favicons/red')
    archive.directory(path.join(__root, 'favicons', 'icons/yellow'), 'favicons/yellow')
    archive.finalize()
  })
}

function archiveFigmaTokens() {
  return new Promise((resolve, reject) => {
    const output = createWriteStream(path.join(__docs_downloads, 'figma-tokens.zip'))
    output.on('close', () => resolve())
    output.on('error', err => reject(err.message))

    const archive = archiver('zip', { zlib: { level: 9 } })
    archive.on('error', err => reject(err.message))
    archive.pipe(output)
    archive.glob('*.json', { cwd: path.join(__root, 'tokens', 'dist/figma') })
    archive.finalize()
  })
}

async function copyToPublic(src, target) {
  await copy(src, path.join(__docs_public, target))
}

async function copyToAsset(src, target) {
  await copy(src, path.join(__docs_assets, target))
}

async function copyResources() {
  await copyToAsset(path.join(__root, 'maps/markers'), 'images/map-markers')
  await copyToAsset(path.join(__root, 'icons/dist/icons.json'), 'data/icons.json')
  await copyToAsset(path.join(__root, 'brand-icons/dist/brand-icons.json'), 'data/brand-icons.json')
  await copyToAsset(path.join(__root, 'components/.tmp/commands.json'), 'data/commands.json')
  await copyToAsset(path.join(__root, 'components/.tmp/components.json'), 'data/components.json')
  await copyToAsset(path.join(__root, 'components/.tmp/components.d.ts'), 'data/components.d.ts')
  await copyToAsset(path.join(__root, 'components/.tmp/contributors.json'), 'data/contributors.json')
  await copyToAsset(path.join(__root, 'components/.tmp/selectors.json'), 'data/selectors.json')
  await copyToAsset(path.join(__dirname, '../../resources/data/tags.json'), 'data/tags.json')
  await copyToPublic(
    path.join(__root, 'components-table/css/design-system-table.css'),
    'assets/css/design-system-table.css',
  )
  await copyToPublic(
    path.join(__root, 'css/css/baloise-design-system.min.css'),
    'assets/css/baloise-design-system.min.css',
  )
  await copyToPublic(path.join(__root, 'icons/svg'), 'assets/images/icons')
  await copyToPublic(path.join(__root, 'brand-icons/svg'), 'assets/images/brand-icons')
  await copyToPublic(path.join(__root, 'fonts/lib'), 'assets/fonts')
}

run()
