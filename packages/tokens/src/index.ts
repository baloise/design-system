import StyleDictionary from 'style-dictionary'
import { copy, ensureDir, pathExists } from 'fs-extra'
import { resolve } from 'path'

import { registerCustomTransformers } from './transformers.js'
import { registerCustomFormatters } from './formatter.js'

registerCustomTransformers(StyleDictionary)
registerCustomFormatters(StyleDictionary)

import ConfigBase from './config.base.js'
import { createBrandConfig } from './config.brand.js'

// Base build
const StyleDictionaryBase = new StyleDictionary(ConfigBase)
StyleDictionaryBase.buildAllPlatforms()

// Brand builds — add new brand names here (must match tokens/<Name>.tokens.json)
const brands = ['Tcs']
for (const brand of brands) {
  const { config, cleanup } = createBrandConfig(brand)
  try {
    const sd = new StyleDictionary(config)
    await sd.buildAllPlatforms()
  } finally {
    cleanup()
  }
}

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
