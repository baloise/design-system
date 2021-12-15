const isDevelopment = process.env.STORYBOOK_MODE === 'dev'

module.exports = {
  stories: ['../src/**/intro.stories.mdx', '../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-a11y', './addons/source/index.js'],
  features: {
    postcss: false,
  },
  staticDirs: ['../public'],
  previewHead: head => `
    ${head}
    <link rel="stylesheet" type="text/css" href="assets/css/design-system-table.css" />
    <link rel="stylesheet" type="text/css" href="assets/css/theme.css" />
    ${isDevelopment ? '<script type="module" src="build/design-system-components.esm.js"></script>' : ''}
    ${isDevelopment ? '<script nomodule src="build/design-system-components.js"></script>' : ''}
    `,
}
