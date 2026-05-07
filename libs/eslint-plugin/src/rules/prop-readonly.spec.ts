import { RuleTester } from 'eslint'
import { propReadonly } from './prop-readonly'

const tester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { legacyDecorators: true },
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
