const isDebugMode = process.env.STORYBOOK_MODE === 'debug'

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
    ${!isDebugMode ? '<link rel="stylesheet" type="text/css" href="build/design-system-components.css" />' : ''}
    ${isDebugMode ? '<script type="module" src="build/design-system-components.esm.js"></script>' : ''}
    ${isDebugMode ? '<script nomodule src="build/design-system-components.js"></script>' : ''}
    `,
}
