/**
 * archive favicons
 * --------------------------------------
 * This script creates a zip file out of the favicons for the documentation
 */

const fs = require('fs')
const path = require('path')
const archiver = require('archiver')
const log = require('./utils/log')

const DIRNAME = path.normalize(__dirname);
const PACKAGE = path.join(DIRNAME, "../packages/favicons");

const main = async () => {
  await log.title('favicons: archive')

  const docsDir = path.join(PACKAGE, 'dist')
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir)
  }

  const output = fs.createWriteStream(path.join(docsDir, 'favicons.zip'))
  const archive = archiver('zip', {
    zlib: { level: 9 }, // Sets the compression level.
  })

  output.on('close', function () {
    log.success('ZIP file created with ' + archive.pointer() + ' bytes')
  })

  archive.pipe(output)

  archive.directory('icons/primary', true)
  archive.directory('icons/white', true)
  archive.directory('icons/green', true)
  archive.directory('icons/purple', true)
  archive.directory('icons/red', true)
  archive.directory('icons/yellow', true)

  archive.finalize()
}

main()
