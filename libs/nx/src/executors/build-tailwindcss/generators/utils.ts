import { mkdir, readFile, writeFile } from 'fs/promises'
import get from 'lodash.get'
import { dirname, join } from 'path'

export const NEWLINE = '\n'
export const DASH_SEPARATOR = '-'
export const COLON_SEPARATOR = `\\:`

type Token = { name: string; value: string }
type Tokens = { [key: string]: Token }

export const getTokens = async ({ token, tokensRoot }): Promise<Tokens> => {
  const content = await readFile(join(tokensRoot, `dist/tokens.docs.json`), 'utf8')
  const json = JSON.parse(content)
  return get(json, token) as Tokens
}

export const writeFileRecursive = async (filePath, data) => {
  await mkdir(dirname(filePath), { recursive: true })
  await writeFile(filePath, data)
}
