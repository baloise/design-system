import { isBlank } from '../utils/balStringUtil'
/**
 * @description
 * If the value is empty it shows a dash ('-').
 *
 * @example
 * balDefaultString('') => -\n
 * balDefaultString('text') => text
 */
export const balDefaultString = (value: string | undefined, defaultString: string = '-'): string => {
  return isBlank(value) ? defaultString : value
}
