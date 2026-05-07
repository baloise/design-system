import { ESLintUtils } from '@typescript-eslint/utils'

const createRule = ESLintUtils.RuleCreator(
  name => `https://design.helvetia.com/contributing/component-style-guide#${name}`,
)

export const noRelativeImports = createRule({
  name: 'no-relative-imports',
  meta: {
    type: 'problem',
    docs: { description: 'Use @utils and @global path aliases instead of relative paths.' },
    messages: {
      useAlias: 'Use @utils or @global instead of relative path "{{path}}". Relative imports to ../../utils or ../../global are not allowed.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      ImportDeclaration(node) {
        const path = node.source.value
        // Flag any relative import (starts with ..) that reaches a utils or global segment
        if (path.startsWith('..') && /(\/utils|\/global)(\/|$)/.test(path)) {
          context.report({
            node: node.source,
            messageId: 'useAlias',
            data: { path },
          })
        }
      },
    }
  },
})
