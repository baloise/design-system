export const parseValue = (value: unknown) => {
  return value !== null && value !== undefined ? value : ''
}
