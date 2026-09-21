import StyleDictionary from 'style-dictionary'
import { copy, ensureDir, pathExists } from 'fs-extra'
import { resolve } from 'path'

console.log(`
\x1b[35m┃\x1b[0m
\x1b[35m┃\x1b[0m  \x1b[1;37m🧩 Helvetia Design System\x1b[0m
\x1b[35m┃\x1b[0m  \x1b[90m🎨 Building Tokens Package\x1b[0m
\x1b[35m┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\x1b[0m
`)

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
const brands = ['ERV']
for (const brand of brands) {
  const { config, cleanup } = createBrandConfig(brand)
  try {
    const sd = new StyleDictionary(config, { verbosity: 'verbose' })
    await sd.buildAllPlatforms()
  } finally {
    cleanup()
  }
}

// copy generated files to css folder in core assets
const projectRoot = process.cwd()
const sourceDir = resolve(projectRoot, 'dist', 'css')
const targetDir = resolve(projectRoot, '..', 'core', 'www', 'assets', 'tokens')
const storybookTargetDir = resolve(projectRoot, '..', '..', 'apps', 'storybook', 'public', 'assets', 'css')

;(async () => {
  await ensureDir(targetDir)
  await ensureDir(storybookTargetDir)
  if (await pathExists(sourceDir)) {
    await copy(sourceDir, targetDir, { overwrite: true })
    await copy(sourceDir, storybookTargetDir, { overwrite: true })
  } else {
    console.warn(`Tokens CSS directory not found at: ${sourceDir}`)
  }
})()
