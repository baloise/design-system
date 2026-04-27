/* eslint-disable @nx/enforce-module-boundaries */
import { JsonDocs, OutputTargetDocsCustom } from '@stencil/core/internal'
import { mkdirSync, writeFileSync } from 'fs'
import path from 'path'
import { NEWLINE, SPACE } from './constants'
import { eventsToMarkdown } from './markdown-events'
import { methodsToMarkdown } from './markdown-methods'
import { propsToMarkdown } from './markdown-props'
import { slotsToMarkdown } from './markdown-slots'

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
  },
}
