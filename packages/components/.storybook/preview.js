import { app } from '@storybook/vue3'

app.config.compilerOptions.isCustomElement = tag => tag.startsWith('bal-doc-')

export const decorators = [
  story => ({
    components: { story },
    template: '<bal-doc-app id="custom-wrapper"><story /></bal-doc-app>',
  }),
]

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: { expanded: true },
  viewport: {
    viewports: {
      'small': {
        name: 'Small (Mobile)',
        styles: {
          width: '768px',
          height: '414px',
        },
        type: 'mobile',
      },
      'medium': {
        name: 'Medium (Tablet)',
        styles: {
          width: '1023px',
          height: '834px',
        },
        type: 'tablet',
      },
      'large': {
        name: 'Large (Desktop)',
        styles: {
          width: '1216px',
          height: '801px',
        },
        type: 'desktop',
      },
      'x-large': {
        name: 'X-Large (Desktop)',
        styles: {
          width: '1408px',
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
        value: '#039',
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
        'Getting-Started',
        ['Overview', 'How to use Storybook', 'Figma', 'HTML5', 'Angular', 'Vue', 'React'],
        'Usage',
        'Design',
        ['Overview','Colors', 'Typography', 'Icons', 'Spacing', 'Breakpoints', 'Grid', 'Page Layout', 'Templates', 'Form'],
        'Components',
        'Templates',
        'Contributing',
      ],
    },
  },
}
