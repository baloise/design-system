const path = require('path')
// const htmlParser = require('node-html-parser')
const log = require('../../.scripts/log')
const file = require('../../.scripts/file')

async function main() {
  log.title('create examples docs')

  await file.copy(path.join(__dirname, '../../resources/fonts'), path.join(__dirname, '../examples/assets/fonts'))
  await file.copy(path.join(__dirname, '../../packages/library/.temp/build'), path.join(__dirname, '../examples/build'))

  const files = await file.scan(path.join(__dirname, '../../packages/library/src/examples/*.html'))
  for (let index = 0; index < files.length; index++) {
    const filePath = files[index]
    await file.copy(
      filePath,
      path.join(
        __dirname,
        '../examples',
        filePath.replace(path.join(__dirname, '../../packages/library/src/examples'), ''),
      ),
    )
  }
}

main()
