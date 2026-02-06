import StyleDictionary from 'style-dictionary'
import { copy, ensureDir, pathExists } from 'fs-extra'
import { join, resolve } from 'path'

import { registerCustomTransformers } from './transformers.js'
import { registerCustomFormatters } from './formatter.js'

registerCustomTransformers(StyleDictionary)
registerCustomFormatters(StyleDictionary)

import ConfigBase from './config.base.js'

const StyleDictionaryBase = new StyleDictionary(ConfigBase)

StyleDictionaryBase.buildAllPlatforms()

// copy generated files to css folder in core assets
const projectRoot = process.cwd()
const sourceDir = resolve(projectRoot, 'dist', 'css')
const targetDir = resolve(projectRoot, '..', 'core', 'www', 'assets', 'tokens')

;(async () => {
  await ensureDir(targetDir)
  if (await pathExists(sourceDir)) {
    await copy(sourceDir, targetDir, { overwrite: true })
  } else {
    console.warn(`Tokens CSS directory not found at: ${sourceDir}`)
  }
})()
