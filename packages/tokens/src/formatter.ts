import StyleDictionary, { Dictionary } from 'style-dictionary'
import { fileHeader, formattedVariables } from 'style-dictionary/utils'
import { propertyFormatNames } from 'style-dictionary/enums'
import path from 'path'

export const registerCustomFormatters = (sd: typeof StyleDictionary) => {
  /**
   * CSS Responsive Formatter
   * ------------------------------------------------------
   */
  sd.registerFormat({
    name: 'ds/css/variables-responsive',
    format: async ({ dictionary, file, options }) => {
      const { outputReferences } = options
      const header = await fileHeader({ file })

      // find reponsive tokens in dictionary which ends with -mobile, -tablet or -desktop
      const baseTokensOriginal = dictionary.allTokens.filter(token => token.name.endsWith('-mobile'))
      // create a deeop copy of base tokens
      const baseTokens = JSON.parse(JSON.stringify(baseTokensOriginal))
      const deviceBaseTokens = JSON.parse(JSON.stringify(baseTokensOriginal))

      //
      // Base tokens
      // ------------------------------------------------------

      // same as mobile but without the suffix
      baseTokens.forEach(token => {
        token.name = token.name.replace('-mobile', '')
      })

      const baseDictionary = {
        ...dictionary,
        allTokens: baseTokens,
      } as Dictionary

      //
      // Device tokens
      // ------------------------------------------------------

      // same as mobile but without the suffix
      deviceBaseTokens.forEach(token => {
        token.name = token.name.replace('-mobile', '-device')
      })
      const deviceBaseDictionary = {
        ...dictionary,
        allTokens: deviceBaseTokens,
      } as Dictionary

      const tabletTokensOriginal = dictionary.allTokens.filter(token => token.name.endsWith('-tablet'))
      const deviceTabletTokens = JSON.parse(JSON.stringify(tabletTokensOriginal))
      deviceTabletTokens.forEach(token => {
        token.name = token.name.replace('-tablet', '-device')
      })
      const deviceTabletDictionary = {
        ...dictionary,
        allTokens: deviceTabletTokens,
      } as Dictionary

      const desktopTokensOriginal = dictionary.allTokens.filter(token => token.name.endsWith('-desktop'))
      const deviceDesktopTokens = JSON.parse(JSON.stringify(desktopTokensOriginal))
      deviceDesktopTokens.forEach(token => {
        token.name = token.name.replace('-desktop', '-device')
      })
      const deviceDesktopDictionary = {
        ...dictionary,
        allTokens: deviceDesktopTokens,
      } as Dictionary

      const mobileCss =
        ':root {\n' +
        formattedVariables({
          format: propertyFormatNames.css,
          dictionary,
          outputReferences,
          usesDtcg: true,
        }) +
        '\n\n' +
        '  /* Base tokens */\n' +
        formattedVariables({
          format: propertyFormatNames.css,
          dictionary: baseDictionary,
          outputReferences,
          usesDtcg: true,
        }) +
        '\n\n' +
        '  /* Device tokens */\n' +
        formattedVariables({
          format: propertyFormatNames.css,
          dictionary: deviceBaseDictionary,
          outputReferences,
          usesDtcg: true,
        }) +
        '\n}\n\n' +
        '/* Device tokens: Tablet */\n' +
        `\n@media (min-width: 769px) {\n` +
        formattedVariables({
          format: propertyFormatNames.css,
          dictionary: deviceTabletDictionary,
          outputReferences,
          usesDtcg: true,
        }) +
        `\n}\n\n` +
        '/* Device tokens: Desktop */\n' +
        `\n@media (min-width: 1024px) {\n` +
        formattedVariables({
          format: propertyFormatNames.css,
          dictionary: deviceDesktopDictionary,
          outputReferences,
          usesDtcg: true,
        }) +
        `\n}\n` +
        '\n'

      return (
        header +
        ':root {\n' +
        formattedVariables({
          format: propertyFormatNames.css,
          dictionary,
          outputReferences,
          usesDtcg: true,
        }) +
        '\n\n' +
        '  /* Base tokens */\n' +
        formattedVariables({
          format: propertyFormatNames.css,
          dictionary: baseDictionary,
          outputReferences,
          usesDtcg: true,
        }) +
        '\n\n' +
        '  /* Device tokens */\n' +
        formattedVariables({
          format: propertyFormatNames.css,
          dictionary: deviceBaseDictionary,
          outputReferences,
          usesDtcg: true,
        }) +
        '\n}\n\n' +
        '/* Device tokens: Tablet */\n' +
        `\n@media (min-width: 769px) {\n` +
        ':root {\n' +
        formattedVariables({
          format: propertyFormatNames.css,
          dictionary: deviceTabletDictionary,
          outputReferences,
          usesDtcg: true,
        }) +
        `\n}` +
        `\n}\n\n` +
        '/* Device tokens: Desktop */\n' +
        `\n@media (min-width: 1024px) {\n` +
        ':root {\n' +
        formattedVariables({
          format: propertyFormatNames.css,
          dictionary: deviceDesktopDictionary,
          outputReferences,
          usesDtcg: true,
        }) +
        `\n}` +
        `\n}\n` +
        '\n'
      )
    },
  })
}
