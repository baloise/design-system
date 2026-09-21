import tseslint from 'typescript-eslint'
import baseConfig from '../../eslint.config.base'

// eslint-config-next doesn't support ESLint 10 yet (eslint-plugin-react peer caps at ^9.7) —
// revisit once it does, in the meantime this app lints with the same shared TS config as the
// rest of the repo, matching the eslint version used everywhere else in the workspace.
export default tseslint.config({ ignores: ['**/.next/**'] }, ...baseConfig)
