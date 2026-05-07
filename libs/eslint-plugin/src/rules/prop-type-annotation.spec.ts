import { RuleTester } from 'eslint'
import { propTypeAnnotation } from './prop-type-annotation'

const tester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { legacyDecorators: true },
  },
})

tester.run('ds/prop-type-annotation', propTypeAnnotation as any, {
  valid: [
    { code: `class C { @Prop() readonly disabled: boolean = false }` },
    { code: `class C { @Prop() readonly label: string = '' }` },
    { code: `class C { @Prop() readonly count: number = 0 }` },
    { code: `class C { @Prop() readonly size: string }` },
    { code: `class C { @State() active = false }` },
  ],
  invalid: [
    {
      code: `class C { @Prop() readonly disabled = false }`,
      errors: [{ messageId: 'missingTypeAnnotation' }],
    },
    {
      code: `class C { @Prop() readonly size = 'md' }`,
      errors: [{ messageId: 'missingTypeAnnotation' }],
    },
    {
      code: `class C { @Prop() readonly count = 0 }`,
      errors: [{ messageId: 'missingTypeAnnotation' }],
    },
  ],
})
