import { RuleTester } from 'eslint'
import * as typescriptParser from '@typescript-eslint/parser'
import { handlerNaming } from './handler-naming'

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

tester.run('ds/handler-naming', handlerNaming as any, {
  valid: [
    { code: `class C { private handleClick = () => {} }` },
    { code: `class C { private handleKeyDown = (e: KeyboardEvent) => {} }` },
    { code: `class C { someOtherArrow = () => {} }` },
    { code: `class C { onClick() {} }` },
  ],
  invalid: [
    {
      code: `class C { onClick = () => {} }`,
      errors: [{ messageId: 'useHandlePrefix' }],
    },
    {
      code: `class C { onChange = (e: Event) => {} }`,
      errors: [{ messageId: 'useHandlePrefix' }],
    },
    {
      code: `class C { private onFocus = () => {} }`,
      errors: [{ messageId: 'useHandlePrefix' }],
    },
  ],
})
