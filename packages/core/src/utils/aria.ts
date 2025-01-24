export const ariaBooleanToString = (value?: boolean | null) => {
  if (value === undefined || value === null) {
    return undefined
  }

  return !!value ? 'true' : 'false'
}
