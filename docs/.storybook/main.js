import { join, dirname } from 'path'
// import remarkGfm from 'remark-gfm';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')))
}

/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    './addons/version/index.js',
    './addons/framework/index.js',
    './addons/source/index.js',
    './addons/title/index.js',
    './addons/cookie/index.js',
  ],
  framework: {
    name: getAbsolutePath('@storybook/html-vite'),
    options: {},
  },
  staticDirs: ['../public'],
  docs: {
    autodocs: 'tag',
    defaultName: 'Documentation',
  },
  previewHead: head => `
  ${head}
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <meta name="google-site-verification" content="V-xdh42LRf35hk9zTuOMYVMciysyMM3MoUTljpUMn4Q" />
  <link rel="stylesheet" type="text/css" href="assets/css/baloise-design-system.min.css" />
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
