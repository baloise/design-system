export const props = (args: any): string => {
  return Object.keys(args)
    .filter(key => !key.startsWith('on'))
    .filter(key => args[key] !== false && args[key] !== undefined && args[key] !== null && args[key] !== '')
    .map(key => (args[key] === true ? `${key}="true"` : `${key}="${args[key]}"`))
    .join(' ')
}
