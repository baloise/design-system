import { round } from 'lodash'

/**
 * Transforms the filesize in human readable string.
 *
 * ```typescript
 * balFileSize(86956565) // 82.9 MB
 * ```
 */
export function balFileSize(value: number): string {
  if (value < 1024) {
    return `${value} bytes`
  } else if (value < 1024 * 1024) {
    return `${round(value / 1024)} kB`
  } else {
    return `${round(value / (1024 * 1024), 1)} MB`
  }
}
