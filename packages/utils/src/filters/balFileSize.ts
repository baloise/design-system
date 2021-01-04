import { BalNumberUtil } from '../utils/number.util'

/**
 * @description
 * Transforms the filesize in human readable string.
 *
 * @example
 * balFileSize(86956565) => 82.9 MB
 */
export const balFileSize = (value: number): string => {
  if (value < 1024) {
    return `${value} bytes`
  } else if (value < 1024 * 1024) {
    return `${BalNumberUtil.round(value / 1024)} kB`
  } else {
    return `${BalNumberUtil.round(value / (1024 * 1024), 1)} MB`
  }
}
