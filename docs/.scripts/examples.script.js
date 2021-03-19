const path = require('path')
const htmlParser = require('node-html-parser')
const log = require('../../.scripts/log')
const file = require('../../.scripts/file')
const api = require('./utils/api.util')
const testing = require('./utils/testing.util')
const github = require('./utils/github.util')
const { NEWLINE, LEFT_WHITESPACE } = require('../../.scripts/constants')

const JAVASCRIPT_CONTENT = []
let INDEX = 0

async function main() {
  log.title('create examples docs')

  const files = await file.scan(path.join(__dirname, '../../packages/library/src/examples/*.html'))
  for (let index = 0; index < files.length; index++) {
    const filePath = files[index]
    const htmlFileContent = await file.read(filePath)
    const root = htmlParser.parse(htmlFileContent)
    const bodyElement = root.querySelector('body')
    if (!bodyElement) {
      log.error(`Example file ${filePath} is invalid`)
      return process.exit(1)
    }
    const newFilePath = path.join(
      __dirname,
      '../examples',
      filePath.replace(path.join(__dirname, '../../packages/library/src/examples'), ''),
    )
    await file.save(newFilePath, wrapIntoHeader(bodyElement.outerHTML))
  }
}

function wrapIntoHeader(content) {
  return `<!DOCTYPE html>
<html dir="ltr" lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@baloise/ui-library/dist/ui-library/ui-library.css" />
  <script type="module" src="https://cdn.jsdelivr.net/npm/@baloise/ui-library/dist/ui-library/ui-library.esm.js"></script>
</head>
${content}
</html>
 `
}

main()
