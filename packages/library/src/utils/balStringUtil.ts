export const isBlank = (s?: string): boolean => {
  return s == null || ('' + s).trim() === ''
}

export const isNotBlank = (s?: string): boolean => {
  return !isBlank(s)
}

export const assertNotBlank = (s: string): void => {
  if (isBlank(s)) {
    throw new Error('Assertion error: given string param must not be blank.')
  }
}

export const isStringLiteral = (s: any): boolean => {
  return typeof s === 'string'
}
