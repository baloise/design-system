export const props = (args: any): string => {
  return Object.keys(args)
    .filter(key => !key.startsWith('on'))
    .filter(key => args[key] !== false)
    .map(key => (args[key] === true ? key : `${key}=${args[key]}`))
    .join(' ')
}
