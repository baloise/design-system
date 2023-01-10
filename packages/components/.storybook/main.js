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
    <link rel="stylesheet" type="text/css" href="assets/css/design-system-table.css" />
    <link rel="stylesheet" type="text/css" href="assets/css/font.css" />
    <link rel="stylesheet" type="text/css" href="assets/css/preview.css" />
    <link rel="stylesheet" type="text/css" href="assets/css/swot.css" />
    <link rel="stylesheet" type="text/css" href="assets/css/avatars.css" />
    <link rel="stylesheet" type="text/css" href="assets/css/table-of-content.css" />
    `,
}
