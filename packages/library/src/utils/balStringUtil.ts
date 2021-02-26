export function isBlank(s?: string | null): boolean {
  return s == null || s == undefined || ('' + s).trim() === ''
}

export function isNotBlank(s?: string): boolean {
  return !isBlank(s)
}

export function assertNotBlank(s: string): void {
  if (isBlank(s)) {
    throw new Error('Assertion error: given string param must not be blank.')
  }
}

export function isStringLiteral(s: any): boolean {
  return typeof s === 'string'
}
