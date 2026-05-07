import { ESLintUtils } from '@typescript-eslint/utils'
import { hasDecorator, getMethodName } from '../utils'

const createRule = ESLintUtils.RuleCreator(
  name => `https://design.helvetia.com/contributing/component-style-guide#${name}`,
)

const LIFECYCLE_HOOKS = new Set([
  'connectedCallback',
  'disconnectedCallback',
  'componentWillLoad',
  'componentDidLoad',
  'componentWillRender',
  'componentDidRender',
  'componentWillUpdate',
  'componentDidUpdate',
  'render',
])

const EXEMPT_DECORATORS = ['Method', 'Watch', 'Listen', 'Logger', 'ListenToBreakpoints', 'ListenToWindowResize']

export const methodPrivate = createRule({
  name: 'method-private',
  meta: {
    type: 'suggestion',
    docs: { description: 'All class methods must be private unless they are lifecycle hooks or decorated with @Method, @Watch, @Listen, or @Logger.' },
    messages: {
      mustBePrivate:
        'Method "{{name}}" must be private. Add the private keyword, or it should be a lifecycle hook / decorated with @Method, @Watch, or @Listen.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      MethodDefinition(node) {
        if (node.static) return
        if (node.kind === 'get' || node.kind === 'set') return
        const name = getMethodName(node)
        if (!name) return
        if (LIFECYCLE_HOOKS.has(name)) return
        if (EXEMPT_DECORATORS.some(d => hasDecorator(node, d))) return
        if (node.accessibility === 'private') return
        context.report({ node, messageId: 'mustBePrivate', data: { name } })
      },
    }
  },
})
