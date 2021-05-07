/**
 * Transforms the given blob parameter to object URL string.
 *
 * For more information look up the documentation about [URL.createObjectURL](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL)
 */
export function balBlobToUrl(value: Blob): string {
  return value != null ? URL.createObjectURL(value) : ''
}
