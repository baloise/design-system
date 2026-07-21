export const toKebabCase = (string: unknown) => {
  if (typeof string === 'string') {
    return string
      .replace(/([a-z])([0-9])/g, '$1-$2')
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase()
  }
  return ''
}
