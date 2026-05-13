import { ESLintUtils } from '@typescript-eslint/utils'
import { hasDecorator, getMethodName } from '../utils'

const createRule = ESLintUtils.RuleCreator(
  name => `https://design.helvetia.com/contributing/component-style-guide#${name}`,
)

export const listenNaming = createRule({
  name: 'listen-naming',
  meta: {
    type: 'suggestion',
    docs: { description: '@Listen() methods must be named listenTo<Event>.' },
    messages: {
      badListenName: '@Listen() method "{{name}}" must be named listenTo<Event> (e.g. listenToClick, listenToKeyDown).',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      MethodDefinition(node) {
        if (!hasDecorator(node, 'Listen')) return
        const name = getMethodName(node)
        if (!name || !/^listenTo[A-Z]/.test(name)) {
          context.report({ node, messageId: 'badListenName', data: { name: name ?? '(unknown)' } })
        }
      },
    }
  },
})
