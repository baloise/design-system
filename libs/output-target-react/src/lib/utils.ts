/**
 * Send a string to lowercase
 *
 * @param str the string to lowercase
 * @returns the lowercased string
 */
export const toLowerCase = (str: string) => str.toLowerCase()

/**
 * Convert a string using dash-case to PascalCase
 *
 * @param str the string to convert to PascalCase
 * @returns the PascalCased string
 */
export const dashToPascalCase = (str: string): string =>
  toLowerCase(str)
    .split('-')
    .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join('')

/**
 * Converts an event name to a PascalCase event listener name.
 *
 * This function takes an event name as input and transforms it into a PascalCase
 * string prefixed with "on-". This is useful for generating standardized event
 * listener names.
 *
 * @param eventName - The name of the event to be converted.
 * @returns The PascalCase event listener name prefixed with "on-".
 */
export const eventListenerName = (eventName: string) => dashToPascalCase(`on-${eventName}`)

/**
 * Checks if the provided value is null or undefined.
 *
 * @param value - The value to check.
 * @returns True if the value is null or undefined, otherwise false.
 */
export function isNill(value: unknown): boolean {
  return value === null || value === undefined
}
