import { mkdir, readFile, writeFile } from 'fs/promises'
import get from 'lodash.get'
import { dirname, join } from 'path'

export const NEWLINE = '\n'
export const DASH_SEPARATOR = '-'
export const COLON_SEPARATOR = `\\:`

export const save = async (fileName, projectRoot, { json, rules }) => {
  await writeFileRecursive(join(projectRoot, 'docs', `${fileName}.json`), json)
  await writeFileRecursive(join(projectRoot, 'src/generated', `${fileName}.sass`), rules)
}

export const getTokens = async ({ token, tokensRoot }) => {
  const content = await readFile(join(tokensRoot, `dist/tokens.docs.json`), 'utf8')
  const json = JSON.parse(content)
  return get(json, token)
}

export const writeFileRecursive = async (filePath, data) => {
  await mkdir(dirname(filePath), { recursive: true })
  await writeFile(filePath, data)
}
