import { readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const STATIC_IMPORT = 'import * as clientComponents from "./components.js";'
const CONDITIONAL_IMPORT =
  'const clientComponents = typeof window === "undefined" ? {} : await import("./components.js");'
const STENCIL_SSR_IMPORT = "import { createComponent } from '@stencil/react-output-target/ssr';"
const LOCAL_SSR_IMPORT = "import { createComponent } from '../ssr-create-component.js';"
const USE_CLIENT = "'use client';\n"

const file = join(dirname(fileURLToPath(import.meta.url)), '../dist/generated/components.server.js')
let source = await readFile(file, 'utf8')

if (!source.includes(LOCAL_SSR_IMPORT)) {
  if (!source.includes(STENCIL_SSR_IMPORT)) {
    throw new Error(`Could not find Stencil SSR createComponent import to patch in ${file}`)
  }
  source = source.replace(STENCIL_SSR_IMPORT, LOCAL_SSR_IMPORT)
}

if (!source.includes(CONDITIONAL_IMPORT)) {
  if (!source.includes(STATIC_IMPORT)) {
    throw new Error(`Could not find clientComponents import to patch in ${file}`)
  }
  source = source.replace(STATIC_IMPORT, CONDITIONAL_IMPORT)
}

if (source.startsWith(USE_CLIENT)) {
  source = source.slice(USE_CLIENT.length)
}

await writeFile(file, source)
