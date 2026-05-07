import { ESLintUtils } from '@typescript-eslint/utils'
import { getDecorator, getDecoratorStringArg, getMethodName } from '../utils'

const createRule = ESLintUtils.RuleCreator(
  name => `https://design.helvetia.com/contributing/component-style-guide#${name}`,
)

export const watchNaming = createRule({
  name: 'watch-naming',
  meta: {
    type: 'suggestion',
    docs: { description: '@Watch("propName") methods must be named propNameChanged.' },
    messages: {
      badWatchName:
        '@Watch("{{propName}}") method "{{actual}}" must be named "{{expected}}".',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      MethodDefinition(node) {
        const watchDecorator = getDecorator(node, 'Watch')
        if (!watchDecorator) return
        const propName = getDecoratorStringArg(watchDecorator, 0)
        if (!propName) return
        const expected = propName + 'Changed'
        const actual = getMethodName(node)
        if (actual !== expected) {
          context.report({
            node,
            messageId: 'badWatchName',
            data: { propName, actual: actual ?? '(unknown)', expected },
          })
        }
      },
    }
  },
})
