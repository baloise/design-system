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
  staticDirs: ['../public'],
  previewHead: head => `
  ${head}
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <meta name="google-site-verification" content="V-xdh42LRf35hk9zTuOMYVMciysyMM3MoUTljpUMn4Q" />
  <link rel="stylesheet" type="text/css" href="assets/css/baloise-design-system.min.css" />
  <link rel="stylesheet" type="text/css" href="assets/css/components.min.css" />
  <link rel="stylesheet" type="text/css" href="assets/css/font.css" />
  <link rel="stylesheet" type="text/css" href="assets/css/preview.css" />
  <link rel="stylesheet" type="text/css" href="assets/css/avatars.css" />
  <link rel="stylesheet" type="text/css" href="assets/css/swot.css" />
  <link rel="stylesheet" type="text/css" href="assets/css/prism.css" />
  <script type="module" src="/build/baloise-design-system.esm.js"></script>
  <script nomodule src="/build/baloise-design-system.js"></script>
  `,
}
export default config
