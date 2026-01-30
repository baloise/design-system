import StyleDictionary from 'style-dictionary'
import { fileHeader, formattedVariables } from 'style-dictionary/utils'
import { propertyFormatNames } from 'style-dictionary/enums'
import path from 'path'

export const registerCustomFormatters = (sd: typeof StyleDictionary) => {
  /**
   * CSS Responsive Formatter
   * ------------------------------------------------------
   */
  sd.registerFormat({
    name: 'bal/css/variables-responsive',
    format: async ({ dictionary, file, options }) => {
      const { outputReferences } = options
      const header = await fileHeader({ file })

      const mobileCss =
        ':root {\n' +
        formattedVariables({
          format: propertyFormatNames.css,
          dictionary,
          outputReferences,
          usesDtcg: true,
        }) +
        '\n}\n'

      const tabletCss = await getResponsiveCss(sd, 'tokens/responsive/Tablet.tokens.json', options)
      const tabletCssKeyWithSuffix = await getResponsiveCss(
        sd,
        'tokens/responsive/Tablet.tokens.json',
        options,
        'tablet',
      )

      const desktopCss = await getResponsiveCss(sd, 'tokens/responsive/Desktop.tokens.json', options)
      const desktopCssKeyWithSuffix = await getResponsiveCss(
        sd,
        'tokens/responsive/Desktop.tokens.json',
        options,
        'desktop',
      )

      return (
        header +
        mobileCss +
        `\n@media (min-width: 769px) {\n${tabletCss}\n}\n` +
        `\n@media (min-width: 1024px) {\n${desktopCss}\n}\n` +
        `\n${tabletCssKeyWithSuffix}\n` +
        `\n${desktopCssKeyWithSuffix}\n`
      )
    },
  })

  /**
   * JSON Responsive Formatter
   * ------------------------------------------------------
   */
  sd.registerFormat({
    name: 'bal/json/variables-responsive',
    format: async ({ dictionary, file, options }) => {
      const mobileTokens = dictionary.allTokens
      const tabletTokens = await getResponsiveTokens(sd, 'tokens/responsive/Tablet.tokens.json', 'tablet')
      const desktopTokens = await getResponsiveTokens(sd, 'tokens/responsive/Desktop.tokens.json', 'desktop')

      const tokens = [...mobileTokens, ...tabletTokens, ...desktopTokens]
      const result: Record<string, any> = {}
      tokens.forEach(token => {
        result[token.name] = token.$value
      })

      return JSON.stringify(result, null, 2)
    },
  })

  /**
   * JavaScript Responsive Formatter
   * ------------------------------------------------------
   */
  sd.registerFormat({
    name: 'bal/javascript/variables-responsive',
    format: async ({ dictionary, file, options }) => {
      const header = await fileHeader({ file })

      const mobileTokens = dictionary.allTokens
      const tabletTokens = await getResponsiveJavascriptTokens(sd, 'tokens/responsive/Tablet.tokens.json', 'tablet')
      const desktopTokens = await getResponsiveJavascriptTokens(sd, 'tokens/responsive/Desktop.tokens.json', 'desktop')

      const tokens = [...mobileTokens, ...tabletTokens, ...desktopTokens]
      const result: Record<string, any> = {}
      tokens.forEach(token => {
        result[token.name] = token.$value
      })

      return (
        header +
        tokens.reduce((acc, token) => {
          acc += `export const ${token.name} = ${JSON.stringify(token.$value)};\n`
          return acc
        }, '')
      )
    },
  })
}

/**
 * Utility functions
 * ------------------------------------------------------
 */

async function getResponsiveJavascriptTokens(sd: typeof StyleDictionary, filePath: string, suffix?: string) {
  const fullPath = path.join(process.cwd(), filePath)

  const config = {
    source: [fullPath],
    platforms: {
      css: {
        transformGroup: 'js', // Changed to js for JS generation
        prefix: 'bal',
        transforms: ['bal/size/round', 'bal/color/hex', 'bal/js/name'], // Use JS transforms
      },
    },
  }

  const instance = new sd(config)
  const dictionary = await instance.getPlatformTokens('css') // Platform key in config is 'css' despite containing JS rules above for reuse simplicity, or better: rename

  if (suffix) {
    dictionary.allTokens.forEach(token => {
      // For JS, we append the suffix directly to the PascalCase name if it exists,
      // or ensure the transform chain already handles it.
      // Assuming bal/js/name produces PascalCase (e.g. BalSizeText).
      token.name = `${token.name}${suffix}`
    })
  }

  return dictionary.allTokens
}

async function getResponsiveTokens(sd: typeof StyleDictionary, filePath: string, suffix?: string) {
  const fullPath = path.join(process.cwd(), filePath)

  const config = {
    source: [fullPath],
    platforms: {
      css: {
        transformGroup: 'css',
        prefix: 'bal',
        transforms: ['bal/size/rem', 'bal/color/hex', 'bal/css/name'],
      },
    },
  }

  const instance = new sd(config)
  const dictionary = await instance.getPlatformTokens('css')

  if (suffix) {
    dictionary.allTokens.forEach(token => {
      token.name = `${token.name}-${suffix}`
    })
  }

  return dictionary.allTokens
}

async function getResponsiveCss(sd: typeof StyleDictionary, filePath: string, options: any, suffix?: string) {
  const { outputReferences } = options
  const fullPath = path.join(process.cwd(), filePath)

  const config = {
    source: [fullPath],
    platforms: {
      css: {
        transformGroup: 'css',
        transforms: ['bal/size/rem', 'bal/css/name'],
      },
    },
  }

  const instance = new sd(config)
  const dictionary = await instance.getPlatformTokens('css')

  if (suffix) {
    dictionary.allTokens.forEach(token => {
      token.name = `${token.name}-${suffix}`
    })
  }

  return (
    ':root {\n' +
    formattedVariables({
      format: propertyFormatNames.css,
      dictionary,
      outputReferences,
      usesDtcg: true,
    }) +
    '\n}'
  )
}
