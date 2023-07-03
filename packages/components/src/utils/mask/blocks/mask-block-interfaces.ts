export type MaskValueFn = (locale: string) => string
export type MaskValue = string | MaskValueFn

export interface MaskBlockOption {
  from: number
  to: number
  isSeparator: boolean
  mask: MaskValue
  allowedKeys: string[]
  format: (value: string, locale: string, mask: string) => string
}
