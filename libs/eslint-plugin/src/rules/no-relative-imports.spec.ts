import { RuleTester } from 'eslint'
import { noRelativeImports } from './no-relative-imports'

const tester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: { ecmaVersion: 2020, sourceType: 'module' },
})

tester.run('ds/no-relative-imports', noRelativeImports as any, {
  valid: [
    { code: `import { Logger } from '@utils'` },
    { code: `import { DsConfigState } from '@global'` },
    { code: `import { Component } from '@stencil/core'` },
    { code: `import { foo } from './sibling'` },
    { code: `import { foo } from '../parent'` },
  ],
  invalid: [
    {
      code: `import { Logger } from '../../utils/log'`,
      errors: [{ messageId: 'useAlias' }],
    },
    {
      code: `import { DsConfigState } from '../../global'`,
      errors: [{ messageId: 'useAlias' }],
    },
    {
      code: `import { foo } from '../../../utils/attributes'`,
      errors: [{ messageId: 'useAlias' }],
    },
    {
      code: `import { bar } from '../../global/index'`,
      errors: [{ messageId: 'useAlias' }],
    },
  ],
})
