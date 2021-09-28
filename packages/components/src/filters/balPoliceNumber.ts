/**
 * Transforms the given string into the correct police-number format.
 *
 * ```typescript
 * balPoliceNumber('501222333') // 50/1.222.333
 * ```
 */
export function balPoliceNumber(value: string | undefined | null | number): string {
  if (!value) {
    return ''
  }
  let newValue = `${value}`
  if (newValue[0] !== '0') {
    newValue = `0${value}`
  }
  const parts = [newValue.substring(1, 3), newValue.substring(3, 4), newValue.substring(4, 7), newValue.substring(7, 10)].filter(val => val.length > 0)
  if (!parts || parts.length < 4) {
    return `${value}`
  }
  return `${parts[0]}/${parts[1]}.${parts[2]}.${parts[3]}`
}
