import { RuleTester } from 'eslint'
import * as typescriptParser from '@typescript-eslint/parser'
import { listenNaming } from './listen-naming'

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

tester.run('ds/listen-naming', listenNaming as any, {
  valid: [
    { code: `class C { @Listen('click') listenToClick() {} }` },
    { code: `class C { @Listen('keydown') listenToKeyDown() {} }` },
    { code: `class C { @Listen('dsChange') listenToDsChange() {} }` },
    { code: `class C { onClick() {} }` },
  ],
  invalid: [
    {
      code: `class C { @Listen('click') onClick() {} }`,
      errors: [{ messageId: 'badListenName' }],
    },
    {
      code: `class C { @Listen('keydown') onKeyDown() {} }`,
      errors: [{ messageId: 'badListenName' }],
    },
    {
      code: `class C { @Listen('click') handleClick() {} }`,
      errors: [{ messageId: 'badListenName' }],
    },
    {
      code: `class C { @Listen('click') listenclick() {} }`,
      errors: [{ messageId: 'badListenName' }],
    },
  ],
})
