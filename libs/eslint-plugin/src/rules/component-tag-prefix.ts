import { ESLintUtils } from '@typescript-eslint/utils'
import { getDecorator, getDecoratorObjectProp } from '../utils'

const createRule = ESLintUtils.RuleCreator(
  name => `https://design.helvetia.com/contributing/component-style-guide#${name}`,
)

export const componentTagPrefix = createRule({
  name: 'component-tag-prefix',
  meta: {
    type: 'problem',
    docs: { description: '@Component tag must start with "ds-".' },
    messages: {
      missingDsPrefix: '@Component tag "{{tag}}" must start with "ds-" (e.g. "ds-{{suggested}}").',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      ClassDeclaration(node) {
        const decorator = getDecorator(node as any, 'Component')
        if (!decorator) return
        const tag = getDecoratorObjectProp(decorator, 'tag')
        if (!tag) return
        if (!tag.startsWith('ds-')) {
          const suggested = tag.startsWith('bal-') ? tag.slice(4) : tag
          context.report({ node: decorator, messageId: 'missingDsPrefix', data: { tag, suggested } })
        }
      },
    }
  },
})
