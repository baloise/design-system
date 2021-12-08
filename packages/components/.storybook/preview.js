export const decorators = [
  story => ({
    components: { story },
    template: '<div class="bal-app"><story /></div>',
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
        'Why a Design System',
        'Architecture',
        'Changelog',
        'Getting-Started',
        ['Overview', 'How to use Storybook', 'HTML5', 'Angular', 'Vue', 'React'],
        'Design',
        ['Overview', 'Colors', 'Typography', 'Breakpoints', 'Spacing', 'Icons', 'Grid', 'Page Layout', 'Form'],
        'Components',
        'Templates',
        'Contributing',
        ['Component', 'Controller', 'Testing'],
      ],
    },
  },
}
