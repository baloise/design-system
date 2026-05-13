import { RuleTester } from 'eslint'
import * as typescriptParser from '@typescript-eslint/parser'
import { propReadonly } from './prop-readonly'

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

tester.run('ds/prop-readonly', propReadonly as any, {
  valid: [
    { code: `class C { @Prop() readonly label: string = '' }` },
    { code: `class C { @Prop({ reflect: true }) readonly disabled: boolean = false }` },
    { code: `class C { @State() active: boolean = false }` },
    { code: `class C { label: string = '' }` },
  ],
  invalid: [
    {
      code: `class C { @Prop() label: string = '' }`,
      errors: [{ messageId: 'missingReadonly' }],
    },
    {
      code: `class C { @Prop({ reflect: true }) disabled: boolean = false }`,
      errors: [{ messageId: 'missingReadonly' }],
    },
  ],
})
