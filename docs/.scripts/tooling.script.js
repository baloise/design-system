const path = require('path')
const log = require('../../.scripts/log')
const file = require('../../.scripts/file')
const { NEWLINE } = require('../../.scripts/constants')
const utilities = require('../../packages/library/.scripts/utilities')

const GENERATE_TAG = '<!-- generated content -->'

async function main() {
  await log.title('filters : docs')
  await updateApiOfDoc('filters', '## API', printFunction)

  await updateApiOfDoc('validators', '## API', printFunction)

  await updateApiOfDoc(
    'utils',
    '',
    utilFile => {
      return [
        `## ${utilFile.fileName.replace('bal', '')}`,
        '',
        ...utilFile.functions.map(printFunction),
        ``,
        `---`,
        ``,
      ].join(NEWLINE)
    },
    true,
  )
}

function printFunction(fn) {
  return [`### ${fn.name}`, ``, `\`${fn.name}${fn.signature}\``, ``, fn.documentation, ``].join(NEWLINE)
}

async function updateApiOfDoc(docName, title, mapFn, returnFiles = false) {
  const content = await readFunctions(docName, mapFn, returnFiles)
  const fileContent = await readFile(docName)
  const fileLines = fileContent.split(NEWLINE)
  const lines = []
  let reachedGeneratedTag = false
  let index = 0
  while (reachedGeneratedTag === false) {
    const line = fileLines[index]
    lines.push(line)
    if (line.trim() === GENERATE_TAG) {
      reachedGeneratedTag = true
    }
    index = index + 1
  }

  await saveFile(docName, [...lines, '', title, '', ...content].join(NEWLINE))
}

async function readFunctions(fileName, mapFn, returnFiles = false) {
  const files = await utilities.read({ fileName })
  if (returnFiles) {
    return files.map(mapFn)
  }
  const functions = files.reduce((acc, f) => [...acc, ...f.functions], [])
  return functions.map(mapFn)
}

async function readFile(fileName) {
  return file.read(path.join(__dirname, `../src/guide/tooling/${fileName}.md`))
}

async function saveFile(fileName, content) {
  await file.save(path.join(__dirname, `../src/guide/tooling/${fileName}.md`), content)
}

main()
