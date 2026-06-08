export interface SelectOption {
  label: string
  value: string
}

export interface SelectCustomEvent<T> extends CustomEvent<T> {
  detail: T
  target: HTMLDsSelectElement
}

export type SelectInputDetail = string | null
export type SelectInput = SelectCustomEvent<SelectInputDetail>

export type SelectChangeDetail = string | null
export type SelectChange = SelectCustomEvent<SelectChangeDetail>

export type SelectBlurDetail = FocusEvent
export type SelectBlur = SelectCustomEvent<SelectBlurDetail>

export type SelectKeyPressDetail = KeyboardEvent
export type SelectKeyPress = SelectCustomEvent<SelectKeyPressDetail>

export type SelectFocusDetail = FocusEvent
export type SelectFocus = SelectCustomEvent<SelectFocusDetail>

export type SelectClickDetail = MouseEvent
export type SelectClick = SelectCustomEvent<SelectClickDetail>
