module.exports = {
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  extends: [
    '@baloise/eslint-config-typescript',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
  },
};
