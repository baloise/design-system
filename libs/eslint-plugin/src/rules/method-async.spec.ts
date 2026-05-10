import { RuleTester } from 'eslint'
import * as typescriptParser from '@typescript-eslint/parser'
import { methodAsync } from './method-async'

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

tester.run('ds/method-async', methodAsync as any, {
  valid: [
    { code: `class C { @Method() async open(): Promise<void> {} }` },
    { code: `class C { @Method() async getValue(): Promise<string> { return '' } }` },
    { code: `class C { open() {} }` },
  ],
  invalid: [
    {
      code: `class C { @Method() open(): void {} }`,
      errors: [{ messageId: 'mustBeAsync' }],
    },
    {
      code: `class C { @Method() getValue(): string { return '' } }`,
      errors: [{ messageId: 'mustBeAsync' }],
    },
  ],
})
