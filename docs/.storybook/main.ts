import type { StorybookConfig } from '@storybook/html-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
  docs: {
    defaultName: 'Documentation',
  },
  staticDirs: ['../public', { from: '../../packages/tokens/dist/css', to: '/assets/tokens' }],
  previewHead: head => `
  ${head}

  <link rel="stylesheet" type="text/css" href="assets/css/design-system.css" />
  <link rel="stylesheet" type="text/css" href="assets/css/fonts.css" />
  <link rel="stylesheet" type="text/css" href="assets/css/preview.css" />
  <link rel="stylesheet" type="text/css" href="assets/css/prism.css" />
  <link rel="stylesheet" type="text/css" href="assets/css/swot.css" />

  <script type="module" src="/build/design-system.esm.js"></script>
  <script nomodule src="/build/design-system.js"></script>
  `,
}
export default config
