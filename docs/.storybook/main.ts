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
  <link rel="stylesheet" type="text/css" href="assets/css/font.css" />
  <link rel="stylesheet" type="text/css" href="assets/css/preview.css" />
  <link rel="stylesheet" type="text/css" href="assets/css/avatars.css" />
  <link rel="stylesheet" type="text/css" href="assets/css/swot.css" />
  <link rel="stylesheet" type="text/css" href="assets/css/prism.css" />
  <link rel="stylesheet" type="text/css" href="assets/css/storybook.css" />
  <link rel="stylesheet" type="text/css" href="assets/css/version.css" />
  <link rel="stylesheet" type="text/css" href="assets/css/framework.css" />

  <link rel="stylesheet" type="text/css" href="assets/css/baloise-design-system.min.css" />

  <script type="module" src="/build/baloise-design-system.esm.js"></script>
  <script nomodule src="/build/baloise-design-system.js"></script>
  `,
}
export default config

// <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
// <link rel="stylesheet" type="text/css" href="assets/css/baloise-design-system.min.css" />
// <link rel="stylesheet" type="text/css" href="assets/css/components.min.css" />
// <link rel="stylesheet" type="text/css" href="assets/css/font.css" />
// <link rel="stylesheet" type="text/css" href="assets/css/preview.css" />
// <link rel="stylesheet" type="text/css" href="assets/css/avatars.css" />
// <link rel="stylesheet" type="text/css" href="assets/css/swot.css" />
// <link rel="stylesheet" type="text/css" href="assets/css/prism.css" />
// <script type="module" src="/build/baloise-design-system.esm.js"></script>
// <script nomodule src="/build/baloise-design-system.js"></script>
