import { RuleTester } from 'eslint'
import { watchNaming } from './watch-naming'

const tester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { legacyDecorators: true },
  },
})

tester.run('ds/watch-naming', watchNaming as any, {
  valid: [
    { code: `class C { @Watch('value') valueChanged() {} }` },
    { code: `class C { @Watch('disabled') disabledChanged() {} }` },
    { code: `class C { @Watch('myProp') myPropChanged() {} }` },
    { code: `class C { valueChanged() {} }` },
  ],
  invalid: [
    {
      code: `class C { @Watch('value') onValueChange() {} }`,
      errors: [{ messageId: 'badWatchName' }],
    },
    {
      code: `class C { @Watch('disabled') watchDisabled() {} }`,
      errors: [{ messageId: 'badWatchName' }],
    },
    {
      code: `class C { @Watch('size') sizeChange() {} }`,
      errors: [{ messageId: 'badWatchName' }],
    },
  ],
})
