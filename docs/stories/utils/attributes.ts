import kebabCase from 'lodash.kebabcase'

export const props = (args: any): string => {
  return Object.keys(args)
    .filter(key => !key.startsWith('on'))
    .filter(key => args[key] !== false && args[key] !== undefined && args[key] !== null)
    .map(key => (args[key] === true ? `${kebabCase(key)}="true"` : `${kebabCase(key)}="${args[key]}"`))
    .join(' ')
}
