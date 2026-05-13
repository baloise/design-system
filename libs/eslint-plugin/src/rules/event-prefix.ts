import { ESLintUtils } from '@typescript-eslint/utils'
import { hasDecorator, getPropertyName } from '../utils'

const createRule = ESLintUtils.RuleCreator(
  name => `https://design.helvetia.com/contributing/component-style-guide#${name}`,
)

export const eventPrefix = createRule({
  name: 'event-prefix',
  meta: {
    type: 'problem',
    docs: { description: '@Event() class fields must start with "ds".' },
    messages: {
      missingDsPrefix: '@Event() field "{{name}}" must start with "ds" (e.g. "ds{{capitalized}}").',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      PropertyDefinition(node) {
        if (!hasDecorator(node, 'Event')) return
        const name = getPropertyName(node)
        if (typeof name === 'string' && !name.startsWith('ds')) {
          const capitalized = name.charAt(0).toUpperCase() + name.slice(1)
          context.report({ node, messageId: 'missingDsPrefix', data: { name, capitalized } })
        }
      },
    }
  },
})
