import dedent from 'ts-dedent'
import { paramCase } from 'param-case'
import { defineCustomElements } from '../dist/custom-elements/index'

defineCustomElements()

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

  return templateSource.replace('{{ args.innerHTML }}', args.innerHTML).replace(
    replacing,
    Object.keys(componentArgs)
      .map(key => ' ' + propToSource(paramCase(key), args[key]))
      .join(''),
  )
}

export const parameters = {
  actions: { argTypesRegex: '^bal.*' },
  controls: { expanded: true },
  docs: {
    transformSource(src, ctx) {
      const match = /\b("')?template\1:\s*`([^`]+)`/.exec(src)
      if (match) {
        return templateSourceCode(dedent(match[2]), ctx.args, ctx.argTypes)
      }
      return src
    },
  },
}
