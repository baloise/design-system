import dedent from 'ts-dedent'
import { paramCase } from 'param-case'
import { defineCustomElements } from '../dist/custom-elements/index'

defineCustomElements()

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
  docs: {
    transformSource(src, ctx) {
      const match = /\b("')?template\1:\s*`([^`]+)`/.exec(src)
      if (match) {
        return templateSourceCode(dedent(match[2]), ctx.args, ctx.argTypes)
      }
      return src
    },
  },
  options: {
    storySort: {
      order: [
        'Welcome',
        'Why a Design System',
        'Architecture',
        'Changelog',
        'Getting-Started',
        ['Overview', 'HTML5', 'Angular', 'Vue', 'React'],
        'Design',
        ['Overview', 'Colors', 'Typography', 'Breakpoints', 'Spacing', 'Icons', 'Grid', 'Page Layout', 'Form'],
        'Components',
      ],
    },
  },
}

const templateSourceCode = (templateSource, args, argTypes, replacing = ' v-bind="args"') => {
  const componentArgs = {}
  for (const [k, t] of Object.entries(argTypes)) {
    const val = args[k]
    if (typeof val !== 'undefined' && t.table && t.table.category === 'props' && val !== t.defaultValue) {
      componentArgs[k] = val
    }
  }

  const propToSource = (key, val) => {
    const type = typeof val
    switch (type) {
      case 'boolean':
        return val ? key : ''
      case 'string':
        return `${key}="${val}"`
      default:
        return `:${key}="${val}"`
    }
  }

  return templateSource
    .replace('{{ args.content }}', args.content)
    .replace('<span v-html="args.content"></span>', args.content)
    .replace(
      replacing,
      Object.keys(componentArgs)
        .map(key => ' ' + propToSource(paramCase(key), args[key]))
        .join(''),
    )
}
