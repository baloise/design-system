/**
 *
 * @param value: time value
 * @output 19:45
 * @private
 */
export function formatTime(value: string): string {
  if (!value) {
    return ''
  }
  const newValue = `${value}`.trim().replace(/\D/g, '')
  const parts = [newValue.substring(0, 2), newValue.substring(2, 4)].filter(val => val.length > 0)
  switch (parts.length) {
    case 1:
      return `${newValue}`
    default:
      return `${parts[0]}:${parts[1]}`
  }
}
