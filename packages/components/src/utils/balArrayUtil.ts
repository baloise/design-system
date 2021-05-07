import { isEqual, isNil } from 'lodash'

/**
 * Returns `true` if the arrays are equal
 *
 * ```typescript
 * areArraysEqual(['a', 'b'], ['b', 'a']) // true
 * ```
 */
export function areArraysEqual<T>(a: T[], b: T[]): boolean {
  if (isNil(a) || isNil(b)) {
    return false
  }
  const copyA = [...a].sort()
  const copyB = [...b].sort()

  return isEqual(copyA, copyB)
}
