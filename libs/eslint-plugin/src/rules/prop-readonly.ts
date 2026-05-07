import { ESLintUtils } from '@typescript-eslint/utils'
import { getDecorator, hasDecorator, hasDecoratorBoolOption } from '../utils'

const createRule = ESLintUtils.RuleCreator(
  name => `https://design.helvetia.com/contributing/component-style-guide#${name}`,
)

export const propReadonly = createRule({
  name: 'prop-readonly',
  meta: {
    type: 'problem',
    docs: { description: 'All @Prop() fields must be marked readonly.' },
    messages: {
      missingReadonly: '@Prop() field "{{name}}" must be readonly. Add the readonly keyword.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      PropertyDefinition(node) {
        if (!hasDecorator(node, 'Prop')) return
        if (node.readonly) return
        const propDec = getDecorator(node, 'Prop')!
        if (hasDecoratorBoolOption(propDec, 'mutable')) return
        const key = node.key
        const name = key.type === 'Identifier' ? key.name : '(unknown)'
        context.report({ node, messageId: 'missingReadonly', data: { name } })
      },
    }
  },
})
