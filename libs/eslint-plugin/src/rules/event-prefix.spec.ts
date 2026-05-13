import { RuleTester } from 'eslint'
import * as typescriptParser from '@typescript-eslint/parser'
import { eventPrefix } from './event-prefix'

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

tester.run('ds/event-prefix', eventPrefix as any, {
  valid: [
    { code: `class C { @Event() dsChange!: EventEmitter<string> }` },
    { code: `class C { @Event() dsCloseClick!: EventEmitter<void> }` },
    { code: `class C { @Event() dsBlur!: EventEmitter<void> }` },
    { code: `class C { change: EventEmitter<string> }` },
  ],
  invalid: [
    {
      code: `class C { @Event() change!: EventEmitter<string> }`,
      errors: [{ messageId: 'missingDsPrefix' }],
    },
    {
      code: `class C { @Event() balChange!: EventEmitter<string> }`,
      errors: [{ messageId: 'missingDsPrefix' }],
    },
    {
      code: `class C { @Event() closeClick!: EventEmitter<void> }`,
      errors: [{ messageId: 'missingDsPrefix' }],
    },
  ],
})
