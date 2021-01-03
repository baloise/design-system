export const BalStringUtil = {
  isBlank(s?: string) {
    return s == null || ('' + s).trim() === ''
  },
  isNotBlank(s?: string) {
    return !BalStringUtil.isBlank(s)
  },
  assertNotBlank(s: string) {
    if (BalStringUtil.isBlank(s)) {
      throw new Error('Assertion error: given string param must not be blank.')
    }
  },
  isStringLiteral(s: any): boolean {
    return typeof s === 'string'
  },
}
