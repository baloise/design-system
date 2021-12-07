import { paramCase } from 'param-case'
import { htmlBeautify } from './html'

export const withSoureCode = (code: string, argTypes = {}, args = {}) => ({
  docs: {
    source: {
      code: htmlBeautify(filterVueSpecific(code, argTypes, args)),
    },
  },
})

const filterVueSpecific = (templateSource: string, argTypes = {}, args = {}): string => {
  const replacing = ' v-bind="args"'
  const componentArgs = {}
  for (const [k, t] of Object.entries(argTypes)) {
    const val = args[k]
    if (typeof val !== 'undefined' && (t as any).table && (t as any).table.category === 'props' && val !== (t as any).defaultValue) {
      componentArgs[k] = val
    }
  }

  const propToSource = (key, val) => {
    const type = typeof val
    switch (type) {
      case 'boolean':
        return val ? key : ''
      case 'string':
      case 'number':
        return `${key}="${val}"`
      default:
        return `:${key}="${val}"`
    }
  }

  return (
    templateSource
      // TODO: write regex to replace events
      .replace(' @click="openModal()"', '')
      .replace(' @click="closeModal()"', '')
      .replace(' @click="closeModal()"', '')
      .replace('{{ args.content }}', (args as any).content || 'Content')
      .replace('<span v-html="args.content"></span>', (args as any).content || 'Content')
      .replace(
        replacing,
        Object.keys(componentArgs)
          .map(key => ' ' + propToSource(paramCase(key), args[key]))
          .join(''),
      )
  )
}
