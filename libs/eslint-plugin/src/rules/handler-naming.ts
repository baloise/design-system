import { ESLintUtils } from '@typescript-eslint/utils'
import { getPropertyName } from '../utils'

const createRule = ESLintUtils.RuleCreator(
  name => `https://design.helvetia.com/contributing/component-style-guide#${name}`,
)

export const handlerNaming = createRule({
  name: 'handler-naming',
  meta: {
    type: 'suggestion',
    docs: { description: 'Arrow function class fields starting with "on" must be renamed to "handle*".' },
    messages: {
      useHandlePrefix:
        'Arrow function field "{{name}}" looks like a DOM handler. Rename it from "on*" to "handle*" (e.g. "handleClick").',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      PropertyDefinition(node) {
        if (!node.value || node.value.type !== 'ArrowFunctionExpression') return
        const name = getPropertyName(node)
        if (typeof name === 'string' && /^on[A-Z]/.test(name)) {
          context.report({ node, messageId: 'useHandlePrefix', data: { name } })
        }
      },
    }
  },
})
