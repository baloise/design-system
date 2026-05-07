import { ESLintUtils } from '@typescript-eslint/utils'
import { hasDecorator, getPropertyName } from '../utils'

const createRule = ESLintUtils.RuleCreator(
  name => `https://design.helvetia.com/contributing/component-style-guide#${name}`,
)

export const propTypeAnnotation = createRule({
  name: 'prop-type-annotation',
  meta: {
    type: 'problem',
    docs: { description: '@Prop() fields with a default value must have an explicit type annotation.' },
    messages: {
      missingTypeAnnotation:
        '@Prop() field "{{name}}" has a default value but no type annotation. Add ": Type" (e.g. ": boolean", ": string", ": DS.ButtonSize").',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      PropertyDefinition(node) {
        if (!hasDecorator(node, 'Prop')) return
        if (!node.value) return
        if (node.typeAnnotation) return
        const name = getPropertyName(node) ?? '(unknown)'
        context.report({ node, messageId: 'missingTypeAnnotation', data: { name } })
      },
    }
  },
})
