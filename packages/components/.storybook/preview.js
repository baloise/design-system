import { app } from '@storybook/vue3'
import { withTableOfContents } from 'hirsch-storybook-docs-toc'
import diff from 'react-syntax-highlighter/dist/esm/languages/prism/diff'
import ReactSyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-light'

app.config.compilerOptions.isCustomElement = tag => tag.startsWith('bal-doc-')

ReactSyntaxHighlighter.registerLanguage('diff', diff)

export const globalTypes = {
  framework: {
    name: 'Framework',
    description: 'Integration technology',
    defaultValue: 'angular',
  },
}

export const decorators = [
  story => ({
    components: { story },
    template: '<bal-doc-app><story /></bal-doc-app>',
  }),
]

export const parameters = {
  ...withTableOfContents(),
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: { expanded: true },
  viewMode: 'docs',
  viewport: {
    viewports: {
      small: {
        name: 'Small (Mobile) from 320px to 768px',
        styles: {
          width: '320px',
          height: '667px',
        },
        type: 'mobile',
      },
      medium: {
        name: 'Medium (Tablet)',
        styles: {
          width: '1023px',
          height: '834px',
        },
        type: 'tablet',
      },
      large: {
        name: 'Large (Desktop)',
        styles: {
          width: '1216px',
          height: '801px',
        },
        type: 'desktop',
      },
      widescreen: {
        name: 'Widescreen (Desktop)',
        styles: {
          width: '1440px',
          height: '801px',
        },
        type: 'desktop',
      },
      fullhd: {
        name: 'FullHD (Desktop)',
        styles: {
          width: '1920px',
          height: '801px',
        },
        type: 'desktop',
      },
    },
  },
  a11y: {
    config: {
      rules: [
        {
          id: 'duplicate-id-active',
          enabled: false,
        },
        {
          id: 'duplicate-id',
          enabled: false,
        },
      ],
    },
  },
  backgrounds: {
    grid: {
      cellSize: 8,
    },
    default: 'white',
    values: [
      {
        name: 'white',
        value: '#fff',
      },
      {
        name: 'blue',
        value: '#000d6e',
      },
      {
        name: 'green',
        value: '#94e3d4',
      },
      {
        name: 'purple',
        value: '#b8b2ff',
      },
      {
        name: 'red',
        value: '#ffaca6',
      },
      {
        name: 'yellow',
        value: '#fae052',
      },
    ],
  },
  options: {
    storySort: {
      order: [
        'Welcome',
        'Design System',
        'Changelog',
        'Support',
        'Foundation',
        [
          'Overview',
        ],
        'Development',
        [
          'Overview',
          'Getting Started',
          'Components',
          'Form',
          'Internationalization',
          'Theming',
          'Testing',
          'Contributing',
          'Migration',
          [
            'Migration 11.x to 12.x',
            'Migration 10.x to 11.x',
            'Migration 9.x to 10.x',
            'Migration 8.x to 9.x',
            'Migration 7.x to 8.x',
            'Migration 6.x to 7.x',
            'Migration 5.x to 6.x',
            'Migration 4.x to 5.x',
            'Migration 3.x to 4.x',
            'Migration 2.x to 3.x',
            'Migration 1.x to 2.x',
          ],
        ],
        'Components',
        [
          'Accordion',
          'Badge',
          'Button',
          'Card',
          'Carousel',
          'Close',
          'Data',
          'Feedback',
          'Form',
          'Hint',
          'Icon',
          'Layout',
          'List',
          'Popover',
          'Table',
          'Tag',
          'Typography',
        ],
      ],
    },
  },
}
