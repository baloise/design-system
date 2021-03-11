import { isEmpty } from 'lodash'

/**
 * If the value is empty it shows a dash ('-').
 *
 * ```typescript
 * balDefaultString('') // -\n
 * balDefaultString('text') // text
 * ```
 */
export function balDefaultString(value: string | undefined | null, defaultString: string = '-'): string {
  return isEmpty(value) ? defaultString : (value as string)
}
