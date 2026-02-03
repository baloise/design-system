import StyleDictionary from 'style-dictionary'
import { copy } from 'fs-extra'
import { join, resolve } from 'path'

import { registerCustomTransformers } from './transformers.js'
import { registerCustomFormatters } from './formatter.js'

registerCustomTransformers(StyleDictionary)
registerCustomFormatters(StyleDictionary)

import ConfigBase from './config.base.js'

const StyleDictionaryBase = new StyleDictionary(ConfigBase)

StyleDictionaryBase.buildAllPlatforms()

// copy generated files to css folder
const projectRoot = process.cwd()
const sourceDir = join(projectRoot, 'css')
const targetDir = resolve(projectRoot, '..', 'core', 'www', 'assets', 'tokens')
copy(sourceDir, targetDir)
