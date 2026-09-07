export interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}

export interface SelectOptionGroup {
  label: string
  options: SelectOption[]
}

/** Single-select emits `string | null`; multi-select emits `string[]`. */
export type SelectChangeDetail = string | string[] | null
export type SelectFocusDetail = FocusEvent
export type SelectBlurDetail = FocusEvent
export type SelectClickDetail = MouseEvent
