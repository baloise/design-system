const EMPTY_VALUES = [undefined, null, '', Number.NaN]

export function isValueEmpty(value: unknown): boolean {
  return EMPTY_VALUES.some(v => Object.is(v, value))
}
