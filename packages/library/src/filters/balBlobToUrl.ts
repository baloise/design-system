/**
 * Transforms the given blob parameter to object URL string.
 */
export const balBlobToUrl = (value: Blob): string => {
  return value != null ? URL.createObjectURL(value) : ''
}
