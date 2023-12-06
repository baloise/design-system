import { createWriteStream, existsSync, mkdirSync } from 'fs'
import { fileURLToPath } from 'url'
import archiver from 'archiver'
import path from 'path'
import { done, logger } from '../../.build/utils/index.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const __root = path.join(__dirname, '../../packages')
const __docs = path.join(__dirname, '../public/assets/download')

const run = async () => {
  const log = logger('doc generating')
  log.start()

  if (!existsSync(__docs)) {
    mkdirSync(__docs)
  }

  try {
    await archiveFont()
    await archiveIcons()
    await archiveBrandIcons()
    await archiveMapMarkers()
    await archiveFavicons()
    await archiveFigmaTokens()
    log.succeed()
  } catch (error) {
    log.fail(error)
  } finally {
    done()
  }
}

function archiveFont() {
  return new Promise((resolve, reject) => {
    const output = createWriteStream(path.join(__docs, 'fonts.zip'))
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
    const output = createWriteStream(path.join(__docs, 'icons.zip'))
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
    const output = createWriteStream(path.join(__docs, 'brand-icons.zip'))
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
    const output = createWriteStream(path.join(__docs, 'map-markers.zip'))
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
    const output = createWriteStream(path.join(__docs, 'favicons.zip'))
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
    const output = createWriteStream(path.join(__docs, 'figma-tokens.zip'))
    output.on('close', () => resolve())
    output.on('error', err => reject(err.message))

    const archive = archiver('zip', { zlib: { level: 9 } })
    archive.on('error', err => reject(err.message))
    archive.pipe(output)
    archive.glob('*.json', { cwd: path.join(__root, 'tokens', 'dist/figma') })
    archive.finalize()
  })
}

run()
