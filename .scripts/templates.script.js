const path = require('path')
const log = require('./log')
const file = require('./file')

async function main() {
  log.title('templates : copy')

  await file.copy(path.join(__dirname, '../packages/fonts/lib'), path.join(__dirname, '../templates/assets/fonts'))

  await file.copy(
    path.join(__dirname, '../packages/components/.temp/build'),
    path.join(__dirname, '../templates/build'),
  )

  const files = await file.scan(path.join(__dirname, '../packages/components/src/templates/*.html'))
  for (let index = 0; index < files.length; index++) {
    const filePath = files[index]
    await file.copy(
      filePath,
      path.join(
        __dirname,
        '../templates',
        filePath.replace(path.join(__dirname, '../packages/components/src/templates'), ''),
      ),
    )
  }

  log.success('finished')
}

main()
