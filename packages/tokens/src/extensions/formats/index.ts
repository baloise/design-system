import { CustomFormatsBuilder, ExtensionContext } from '@nxkit/style-dictionary/extensions'
import camelCase from 'lodash.camelcase'
import upperFirst from 'lodash.upperfirst'
import setWith from 'lodash.setwith'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FigmaFormatter = ({ dictionary, platform, options, file }) => {
  const tokens = {}

  const formatValue = value => {
    if (value.startsWith('{')) {
      const path = value.substring(1, value.length - 1)
      return `{${path
        .split('.')
        .map((p, i) => (i === 0 ? p : upperFirst(camelCase(p))))
        .join('.')}}`
    }
    return value
  }

  dictionary.allTokens.map(token => {
    let value = token.value

    const hasPixelOrPercentage = /px$|%$/.test(token.original.value)
    const isAlias = token.original.value.startsWith('{')
    const keepFormat = token.keepFormat
    const noFigmaImport = token.noFigmaImport

    if (noFigmaImport !== true) {
      if (hasPixelOrPercentage || keepFormat) {
        value = token.original.value
      } else if (isAlias) {
        value = formatValue(token.original.value)
      }

      setWith(
        tokens,
        token.path.map((p, i) => (i === 0 ? p : upperFirst(camelCase(p)))),
        { value, group: token.attributes.category },
        Object,
      )
    }
  })

  return JSON.stringify(tokens, null, 2)
}

FigmaFormatter.nested = true

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const customFormatsBuilder: CustomFormatsBuilder = (extensionContext: ExtensionContext) => {
  return {
    figma: FigmaFormatter,
  }
}

export default customFormatsBuilder
