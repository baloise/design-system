import { isValueEmpty } from './is-value-empty'

export function hasValue(value: unknown): boolean {
  return !isValueEmpty(value)
}
