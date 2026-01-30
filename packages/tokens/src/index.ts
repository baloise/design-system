import StyleDictionary from 'style-dictionary'

import { registerCustomTransformers } from './transformers.js'
import { registerCustomFormatters } from './formatter.js'

registerCustomTransformers(StyleDictionary)
registerCustomFormatters(StyleDictionary)

import ConfigBase from './config.base.js'
import ConfigResponsive from './config.responsive.js'

const StyleDictionaryBase = new StyleDictionary(ConfigBase)
const StyleDictionaryResponsive = new StyleDictionary(ConfigResponsive)

StyleDictionaryBase.buildAllPlatforms()
StyleDictionaryResponsive.buildAllPlatforms()
