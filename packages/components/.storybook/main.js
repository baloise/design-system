const { resolve } = require('path')
const codesandbox = require('remark-codesandbox')

module.exports = {
  stories: ['../src/**/intro.stories.mdx', '../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-a11y'],
  features: {
    postcss: false,
  },
  // webpackFinal: config => {
  //   const mdxRule = config.module.rules.find(rule => rule.test.test('.story.mdx'))

  //   const {
  //     options: { remarkPlugins },
  //   } = mdxRule.use.find(({ loader }) => loader === require.resolve('@mdx-js/loader'))

  //   remarkPlugins.push([
  //     codesandbox,
  //     {
  //       mode: 'iframe',
  //       query: {
  //         fontsize: 14,
  //       },
  //       customTemplates: {
  //         baloise: {
  //           extends: `file:${resolve(__dirname, '../.codesandbox')}`,
  //           entry: 'src/app/app.component.html',
  //         },
  //         // 'reaviz-map': {
  //         //   extends: 'reaviz',
  //         //   files: {
  //         //     'package.json': {
  //         //       content: {
  //         //         ...reavizCodesandboxTemplatePackageJSON,
  //         //         dependencies: {
  //         //           ...reavizCodesandboxTemplatePackageJSON.dependencies,
  //         //         },
  //         //       },
  //         //     },
  //         //   },
  //         // },
  //       },
  //       autoDeploy: true,
  //     },
  //   ])

  //   return config
  // },
}
