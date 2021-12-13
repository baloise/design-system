import { paramCase } from 'param-case'
import { htmlBeautify } from './html'

export const withSoureCode = (code: string, argTypes = {}, args = {}) => {
  const template = htmlBeautify(filterVueSpecific(code, argTypes, args))
  return {
    docs: {
      source: {
        code: template,
      },
    },
    mySource: template,
  }
}

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
      .replace(' @click="checkA()"', '')
      .replace(' @click="checkB()"', '')
      .replace(' v-model="args.value"', '')
      .replace(' v-if="args.invalid"', '')
      .replace(` v-model="selectedA"`, '')
      .replace(` v-model="selectedB"`, '')
      .replace(` v-model="value"`, '')
      .replace(` :class="value === '1' ? 'has-background-blue-light':''"`, '')
      .replace(` :class="value === '2' ? 'has-background-blue-light':''"`, '')
      .replace(` :class="selectedA ? 'has-background-blue-light':''"`, '')
      .replace(` :class="selectedB ? 'has-background-blue-light':''"`, '')
      .replace(' :expanded="args.expanded"', (args as any).expanded === true ? ' expanded' : '')
      .replace(' :disabled="args.disabled"', (args as any).disabled === true ? ' disabled' : '')
      .replace(' :inverted="args.inverted"', (args as any).inverted === true ? ' inverted' : '')
      .replace(' :invalid="args.invalid"', (args as any).invalid === true ? ' invalid' : '')
      .replace(` :color="args.invalid ? 'danger' : 'hint'"`, ` color="${(args as any).invalid === true ? 'danger' : 'hint'}"`)
      .replace(' v-if="args.hasFieldMessage"', '')
      .replace('{{ args.content }}', (args as any).content || 'Content')
      .replace('<span v-html="args.content"></span>', (args as any).content || 'Content')
      .replace(
        replacing,
        Object.keys(componentArgs)
          .map(key => ' ' + propToSource(paramCase(key), args[key]))
          .join(''),
      )
      .replace(
        replacing,
        Object.keys(componentArgs)
          .map(key => ' ' + propToSource(paramCase(key), args[key]))
          .join(''),
      )
  )
}
