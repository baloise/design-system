import { ESLintUtils } from '@typescript-eslint/utils'
import { hasDecorator, getMethodName } from '../utils'

const createRule = ESLintUtils.RuleCreator(
  name => `https://design.helvetia.com/contributing/component-style-guide#${name}`,
)

export const methodAsync = createRule({
  name: 'method-async',
  meta: {
    type: 'problem',
    docs: { description: '@Method() decorated methods must be async.' },
    messages: {
      mustBeAsync: '@Method() "{{name}}" must be async. Change to: async {{name}}(): Promise<void> {}',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      MethodDefinition(node) {
        if (!hasDecorator(node, 'Method')) return
        if (node.value.async) return
        const name = getMethodName(node) ?? '(unknown)'
        context.report({ node, messageId: 'mustBeAsync', data: { name } })
      },
    }
  },
})
