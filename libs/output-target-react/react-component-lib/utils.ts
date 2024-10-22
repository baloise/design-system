/**
 * Checks if the given value is a primitive type.
 *
 * A primitive type in JavaScript includes string, number, and boolean.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a primitive type, otherwise `false`.
 */
export const isPrimitive = (value: unknown): boolean => {
  return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean'
}

/**
 * Converts a camelCase string to dash-case.
 *
 * @param str - The camelCase string to be converted.
 * @returns The converted dash-case string.
 */
export const camelToDashCase = (str: string) => str.replace(/([A-Z])/g, (m: string) => `-${m[0].toLowerCase()}`)
