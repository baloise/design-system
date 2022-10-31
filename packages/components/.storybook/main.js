module.exports = {
  stories: ['../src/**/intro.stories.mdx', '../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@etchteam/storybook-addon-status',
    './addons/source/index.js',
    './addons/vue-source/index.js',
  ],
  features: {
    postcss: false,
  },
  staticDirs: ['../public'],
  previewHead: head => `
    ${head}
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

    <style>
      .bal-body {
        visibility: hidden;
      }
    </style>

    <link rel="stylesheet" type="text/css" href="assets/css/design-system-table.css" />
    <link rel="stylesheet" type="text/css" href="assets/css/theme.css" />

    <script type="module" src="build/design-system-components.esm.js"></script>
    <script nomodule src="build/design-system-components.js"></script>`,
}
