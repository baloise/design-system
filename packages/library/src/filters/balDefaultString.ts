import { isBlank } from '../utils/balStringUtil'
/**
 * If the value is empty it shows a dash ('-').
 *
 * ```typescript
 * balDefaultString('') // -\n
 * balDefaultString('text') // text
 * ```
 */
export function balDefaultString(value: string | undefined | null, defaultString: string = '-'): string {
  return isBlank(value) ? defaultString : (value as string)
}
