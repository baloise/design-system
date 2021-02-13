export const isBlank = (s?: string) => {
  return s == null || ('' + s).trim() === ''
}

export const isNotBlank = (s?: string) => {
  return !isBlank(s)
}

export const assertNotBlank = (s: string) => {
  if (isBlank(s)) {
    throw new Error('Assertion error: given string param must not be blank.')
  }
}

export const isStringLiteral = (s: any): boolean => {
  return typeof s === 'string'
}
