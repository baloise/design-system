import { I18nKeys } from '../../../interfaces'

export type MaskValueFn = (locale: I18nKeys | string) => string
export type MaskValue = string | MaskValueFn

export interface MaskBlockOption {
  from: number
  to: number
  isSeparator: boolean
  mask: MaskValue
  allowedKeys: string[]
  format: (value: string, locale: I18nKeys | string, mask: string) => string
}
