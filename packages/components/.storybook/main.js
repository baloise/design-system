module.exports = {
  stories: ['../src/**/intro.stories.mdx', '../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-a11y', '@etchteam/storybook-addon-status', './addons/source/index.js'],
  features: {
    postcss: false,
  },
  staticDirs: ['../public'],
  previewHead: head => `
    ${head}
    <link rel="stylesheet" type="text/css" href="assets/css/design-system-table.css" />
    <link rel="stylesheet" type="text/css" href="assets/css/theme.css" />`,
}
