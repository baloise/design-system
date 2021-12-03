const path = require('path')
const fs = require('fs')
const log = require('./log')
const file = require('./file')

async function replaceHrefs(filePath) {
  return new Promise((resolve, reject) => {
    console.log(filePath)
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return reject(err)
      }
      let result = data.replace(/\/sandbox\//g, '')
      fs.writeFile(filePath, result, 'utf8', err => {
        if (err) {
          return reject(err)
        }
        return resolve()
      })
    })
  })
}

async function main() {
  log.title('sandbox : copy')

  await file.copy(path.join(__dirname, '../packages/fonts/lib'), path.join(__dirname, '../sandbox/assets/fonts'))

  await file.copy(path.join(__dirname, '../packages/components/.temp/build'), path.join(__dirname, '../sandbox/build'))

  const files = await file.scan(path.join(__dirname, '../packages/components/src/sandbox/*.html'))
  for (let index = 0; index < files.length; index++) {
    const filePath = files[index]
    const newPath = path.join(
      __dirname,
      '../sandbox',
      filePath.replace(path.join(__dirname, '../packages/components/src/sandbox'), ''),
    )
    await file.copy(filePath, newPath)
    await replaceHrefs(newPath)
  }

  log.success('finished')
}

main()
