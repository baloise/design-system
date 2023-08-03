module.exports = {
  stories: ['../src/**/intro.stories.mdx', '../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    './addons/source/index.js',
    './addons/vue-source/index.js',
    './addons/version/index.js',
    './addons/framework/index.js',
  ],
  features: {
    postcss: false,
  },
  staticDirs: ['../public'],
  previewHead: head => `
    ${head}
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="google-site-verification" content="V-xdh42LRf35hk9zTuOMYVMciysyMM3MoUTljpUMn4Q" />
    <link rel="stylesheet" type="text/css" href="assets/css/font.css" />
    <link rel="stylesheet" type="text/css" href="assets/css/preview.css" />
    <link rel="stylesheet" type="text/css" href="assets/css/swot.css" />
    <link rel="stylesheet" type="text/css" href="assets/css/avatars.css" />
    <link rel="stylesheet" type="text/css" href="assets/css/table-of-content.css" />
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/ag-grid-community@29.3.0/styles/ag-grid.css" />
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/ag-grid-community@29.3.0/styles/ag-theme-alpine.css" />
    <link rel="stylesheet" type="text/css" href="assets/css/design-system-table.css" />
    <script src="https://cdn.jsdelivr.net/npm/ag-grid-community@29.3.0/dist/ag-grid-community.noStyle.js"></script>
    `,
}
