/* eslint-disable @nx/enforce-module-boundaries */
import { JsonDocs, OutputTargetDocsCustom } from '@stencil/core/internal'
import { existsSync, mkdirSync, writeFileSync } from 'fs'
import path, { sep } from 'path'
import StyleDictionary from 'style-dictionary'
import { NEWLINE, SPACE } from './constants'
import { eventsToMarkdown } from './markdown-events'
import { methodsToMarkdown } from './markdown-methods'
import { propsToMarkdown } from './markdown-props'
import { slotsToMarkdown } from './markdown-slots'

const TOKEN_PATH = path.join(__dirname, '../../../../packages/tokens')

// Register custom markdown format for tokens
StyleDictionary.registerFormat({
  name: 'markdown/table',
  format: ({ dictionary }) => {
    // Helper function to format shadow values
    const formatShadowValue = (value: any) => {
      if (Array.isArray(value)) {
        return value.map(shadow => `${shadow.offsetX} ${shadow.offsetY} ${shadow.blur} ${shadow.color}`)[0]
      }
      return value
    }

    const formatBorderValue = (value: any) => {
      return `${value.style} ${value.width} ${value.color}`
    }

    const tokens = dictionary.allTokens
    if (tokens.length === 0) {
      return '## CSS Variables\n\nNo custom variables defined for this component.\n'
    }

    let output = '## CSS Variables\n\n'
    output += 'The component can be customized by changing the CSS variables.\n\n'
    output +=
      '<a class="sb-unstyled button is-primary" href="../?path=/docs/development-theming--page">Go to theming guide</a>\n\n'

    output += '<div style="overflow-x: auto; max-height: 600px; margin-top: 48px">\n'
    output += '<table class="table w-full is-striped">\n'
    output += '  <thead>\n'
    output += '    <tr>\n'
    output += '      <th style="border-top: none; border-left: none; border-right: none;">Variable</th>\n'
    output += '      <th>Reference</th>\n'
    output += '      <th>Value</th>\n'
    output += '    </tr>\n'
    output += '  </thead>\n'
    output += '  <tbody>\n'

    const formatKeyToCssVar = (key: string | undefined) => {
      // create kebab-case css variable name from key like {color.red.500} => --color-red-500
      if (!key) return ''
      return `--${key.replace(/[{}]/g, '').replace(/\./g, '-')}`
    }

    tokens
      .filter(token => {
        return token.filePath?.includes('/packages/core/')
      })
      .forEach(token => {
        const name = `--${token.name}`

        // Format shadow values if type is shadow
        let value = token.$value
        if (token.$type === 'shadow') {
          value = formatShadowValue(value)
        }
        if (token.$type === 'border') {
          value = formatBorderValue(value)
        }

        const referenceToken = token.original.key
          ? dictionary.tokenMap.get(token.original.key)
          : token.original.$value
            ? dictionary.tokenMap.get(token.original.$value)
            : ''
        const referenceTokenName = referenceToken ? `--${referenceToken.name}` : formatKeyToCssVar(token.original.key)

        output += '    <tr>\n'
        output += `      <td><code>${name}</code></td>\n`
        output += `      <td><code>${referenceTokenName}</code></td>\n`
        output += `      <td><code>${String(value).replace(/#/g, '\\#')}</code></td>\n`
        output += '    </tr>\n'
      })

    output += '  </tbody>\n'
    output += '</table>\n'
    output += '</div>\n'

    return output
  },
})

export const CustomDocumentationGenerator: OutputTargetDocsCustom = {
  type: 'docs-custom',
  generator: (docs: JsonDocs) => {
    /**
     * Create docs for each component
     */
    for (let index = 0; index < docs.components.length; index++) {
      const component = docs.components[index]
      const isDocs = component.filePath?.includes(`/docs/`)

      if (!isDocs) {
        const componentName = component.tag
        const storyPath = component.dirPath?.replace('packages/core/src', 'docs/src') || ''

        // const componentFolderDepth = component.filePath?.split(sep).length
        // const isRoot = componentFolderDepth === 4

        try {
          mkdirSync(storyPath, { recursive: true })
        } catch (err) {
          console.error(err)
        }

        // Component API
        const props = propsToMarkdown(component.props)
        const events = eventsToMarkdown(component.events)
        const methods = methodsToMarkdown(component.methods)
        const slots = slotsToMarkdown(component.slots)
        const componentApi = [...props, ...events, ...methods, ...slots]
        const hasComponentApi = componentApi.length > 0

        let content: string[] = []

        if (hasComponentApi) {
          content = [`### ${componentName}`, SPACE, ...componentApi, SPACE]
        }

        try {
          writeFileSync(path.join(storyPath, 'api.md'), content.join(NEWLINE))
        } catch (err) {
          console.error(err)
        }
      }
    }

    /**
     * Theming
     * -----------------------------------------
     * Create theming vars of the css package
     */

    for (let index = 0; index < docs.components.length; index++) {
      const component = docs.components[index]
      const isDocs = component.filePath?.includes(`/docs/`)

      const componentName = component.tag
      const storyPath = component.dirPath?.replace('packages/core/src', 'docs/src') || ''

      const componentFolderDepth = component.filePath?.split(sep).length
      const isRoot = componentFolderDepth === 4

      if (!isDocs && isRoot && component.dirPath) {
        const varsFilePath = path.join(component.dirPath, `${componentName}.vars.json`)

        // check if file exists
        if (!existsSync(varsFilePath)) {
          try {
            writeFileSync(path.join(storyPath, 'theming.md'), '')
          } catch (err) {
            console.error(err)
          }
          continue
        }

        const sd = new StyleDictionary(
          {
            include: [path.join(TOKEN_PATH, 'tokens/**/*.json')],
            source: [varsFilePath],
            platforms: {
              web: {
                transformGroup: 'web',
                basePxFontSize: 16,
                buildPath: storyPath,
                prefix: 'bal',
                files: [
                  {
                    format: 'markdown/table',
                    destination: `theming.md`,
                    options: {
                      outputReferences: true,
                    },
                  },
                ],
              },
            },
          },
          { verbosity: 'silent' },
        )
        sd.buildPlatform('web')
      }
    }
  },
}
