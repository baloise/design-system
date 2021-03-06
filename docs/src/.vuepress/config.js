const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Baloise UI Library',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#009ee7' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['link', { rel: 'stylesheet', href: '/lib/dist/ui-library/ui-library.css' }],
    ['link', { rel: 'stylesheet', href: '/assets/css/swot.css' }],
    ['link', { rel: 'stylesheet', href: '/assets/css/demo.css' }],
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: 'https://github.com/baloise/ui-library',
    logo: '/assets/images/logo.svg',
    editLinks: false,
    docsDir: 'docs',
    editLinkText: '',
    lastUpdated: false,
    nav: [
      {
        text: 'Guide',
        link: '/guide/',
      },
      {
        text: 'Components',
        link: '/components/' + require('./generated/components.json')[0],
      },
    ],
    sidebar: {
      '/guide/': [
        {
          title: 'Guide',
          collapsable: false,
          children: [
            'essentials/why',
            'essentials/architecture',
            '',
            'essentials/html5',
            'essentials/styling',
            'essentials/vue',
            'essentials/angular',
          ],
        },
        {
          title: 'Styles',
          collapsable: false,
          children: [],
        },
        {
          title: 'Tooling',
          collapsable: false,
          children: ['tooling/filters', 'tooling/utils', 'tooling/validators'],
        },
        {
          title: 'Development',
          collapsable: false,
          children: [],
        },
      ],
      '/components/': [
        {
          title: 'Components',
          collapsable: false,
          children: require('./generated/components.json'),
        },
      ],
    },
  },
}
