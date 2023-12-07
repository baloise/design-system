import { fileURLToPath } from 'url'
import replace from 'replace-in-file'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.join(path.dirname(__filename), '..')

export async function adjustInterfacesReference() {
  const files = path.join(__dirname, 'dist/types/**/*interfaces.d.ts')
  replace.sync({
    files: files,
    from: `/// <reference path="../../../../../src/interfaces.d.ts" />`,
    to: `/// <reference path="../../../../interfaces.d.ts" />`,
  })
  replace.sync({
    files: files,
    from: `/// <reference path="../../../../src/interfaces.d.ts" />`,
    to: `/// <reference path="../../../interfaces.d.ts" />`,
  })
  replace.sync({
    files: files,
    from: `/// <reference path="../../../src/interfaces.d.ts" />`,
    to: `/// <reference path="../../interfaces.d.ts" />`,
  })
}
