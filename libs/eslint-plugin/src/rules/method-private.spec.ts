import { RuleTester } from 'eslint'
import { methodPrivate } from './method-private'

const tester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { legacyDecorators: true },
  },
})

tester.run('ds/method-private', methodPrivate as any, {
  valid: [
    { code: `class C { private doSomething() {} }` },
    { code: `class C { render() {} }` },
    { code: `class C { connectedCallback() {} }` },
    { code: `class C { disconnectedCallback() {} }` },
    { code: `class C { componentWillLoad() {} }` },
    { code: `class C { componentDidLoad() {} }` },
    { code: `class C { componentWillRender() {} }` },
    { code: `class C { componentDidRender() {} }` },
    { code: `class C { componentWillUpdate() {} }` },
    { code: `class C { componentDidUpdate() {} }` },
    { code: `class C { @Method() async open(): Promise<void> {} }` },
    { code: `class C { @Watch('value') valueChanged() {} }` },
    { code: `class C { @Listen('click') listenToClick() {} }` },
    { code: `class C { @Logger('ds-foo') createLogger(log: any) {} }` },
    { code: `class C { private get isActive() { return true } }` },
  ],
  invalid: [
    {
      code: `class C { doSomething() {} }`,
      errors: [{ messageId: 'mustBePrivate' }],
    },
    {
      code: `class C { fetchData() {} }`,
      errors: [{ messageId: 'mustBePrivate' }],
    },
    {
      code: `class C { protected computeLabel() {} }`,
      errors: [{ messageId: 'mustBePrivate' }],
    },
  ],
})
