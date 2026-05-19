import { mergeConfig } from 'vite'
import type { StorybookConfig } from '@storybook/html-vite'

const toKebabCase = (name: string) =>
  name
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[_\s]+/g, '-')
    .toLowerCase()

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/html-vite',
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
  viteFinal: async config =>
    mergeConfig(config, {
      build: {
        chunkSizeWarningLimit: 2000,
        rolldownOptions: {
          checks: { pluginTimings: false },
        },
        rollupOptions: {
          output: {
            chunkFileNames: ({ name }: { name: string }) => `assets/${toKebabCase(name)}-[hash].js`,
          },
        },
      },
    }),
}
export default config
