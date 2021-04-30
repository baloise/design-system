const path = require('path')
const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Baloise Design System',
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
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/assets/images/logo.svg' }],
    ['link', { rel: 'stylesheet', href: '/assets/css/swot.css' }],
    ['link', { rel: 'stylesheet', href: '/assets/css/demo.css' }],
  ],

  dest: 'public',
  alias: {
    styles: path.resolve(__dirname, './styles'),
  },

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    // repo: 'https://github.com/baloise/ui-library',
    logo: '/assets/images/logo.svg',
    editLinks: false,
    docsDir: 'docs',
    editLinkText: '',
    lastUpdated: false,
    nav: [
      {
        text: 'Design',
        link: '/design/',
      },
      {
        text: 'Components',
        link: '/components/',
      },
      {
        text: 'Resources',
        link: '/resources/',
      },
      {
        text: 'About Us',
        link: '/about-us/',
      },
      // {
      //   text: 'Change Log',
      //   link: '/changelog/',
      // },
    ],
    sidebar: {
      '/design/': [
        {
          title: 'Design',
          collapsable: false,
          children: ['', 'spacing'],
        },
      ],
      '/components/': [
        {
          title: 'Getting Started',
          collapsable: true,
          children: ['', 'essentials/html5', 'essentials/vue', 'essentials/angular'],
        },
        {
          title: 'Styles',
          collapsable: true,
          children: [
            'styles/installation',
            'styles/colors',
            'styles/typography',
            'styles/responsiveness',
            'styles/helpers',
            'styles/footer',
            'styles/table',
            'styles/track-line',
          ],
        },
        {
          title: 'Components',
          collapsable: true,
          children: require('./generated/components.json'),
        },
        {
          title: 'Tooling',
          collapsable: true,
          children: ['tooling/filters', 'tooling/utils', 'tooling/validators', 'tooling/testing'],
        },
      ],
      '/resources/': [
        {
          title: 'Resources',
          collapsable: false,
          children: ['', 'templates'],
        },
      ],
      '/about-us/': [
        {
          title: 'About Us',
          collapsable: false,
          children: ['', 'architecture'],
        },
        {
          title: 'Development',
          collapsable: false,
          children: [
            'development/installation',
            'development/commands',
            'development/component',
            'development/controller',
            'development/release',
          ],
        },
      ],
      // '/guide/': [
      //   {
      //     title: 'Guide',
      //     collapsable: false,
      //     children: [
      //       'essentials/html5',
      //       'essentials/vue',
      //       'essentials/angular',
      //       'essentials/examples',
      //     ],
      //   },

      // ],
    },
  },
}
