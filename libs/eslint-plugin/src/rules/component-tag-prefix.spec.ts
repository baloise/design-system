import { RuleTester } from 'eslint'
import * as typescriptParser from '@typescript-eslint/parser'
import { componentTagPrefix } from './component-tag-prefix'

const tester = new RuleTester({
  languageOptions: {
    parser: typescriptParser,
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      ecmaFeatures: { legacyDecorators: true },
    },
  },
})

tester.run('ds/component-tag-prefix', componentTagPrefix as any, {
  valid: [
    { code: `@Component({ tag: 'ds-button', shadow: true }) class Button {}` },
    { code: `@Component({ tag: 'ds-my-component' }) class MyComponent {}` },
    { code: `class Button {}` },
  ],
  invalid: [
    {
      code: `@Component({ tag: 'button' }) class Button {}`,
      errors: [{ messageId: 'missingDsPrefix' }],
    },
    {
      code: `@Component({ tag: 'my-component' }) class MyComponent {}`,
      errors: [{ messageId: 'missingDsPrefix' }],
    },
    {
      code: `@Component({ tag: 'bal-button' }) class Button {}`,
      errors: [{ messageId: 'missingDsPrefix' }],
    },
  ],
})
