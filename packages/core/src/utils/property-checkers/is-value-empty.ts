import { EMPTY_VALUES } from './constants'

export function isValueEmpty(value: unknown): boolean {
  return EMPTY_VALUES.some(v => Object.is(v, value))
}
