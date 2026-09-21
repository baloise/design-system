export const DATEPICKER_COLORS = ['primary', 'danger', 'success', 'warning'] as const

export type DatepickerColor = (typeof DATEPICKER_COLORS)[number]

export interface DatepickerCustomEvent<T> extends CustomEvent<T> {
  detail: T
  target: HTMLElement
}

export type DatepickerInputDetail = string | null
export type DatepickerInput = DatepickerCustomEvent<DatepickerInputDetail>

export type DatepickerChangeDetail = string | null
export type DatepickerChange = DatepickerCustomEvent<DatepickerChangeDetail>

export type DatepickerBlurDetail = FocusEvent
export type DatepickerBlur = DatepickerCustomEvent<DatepickerBlurDetail>

export type DatepickerKeyPressDetail = KeyboardEvent
export type DatepickerKeyPress = DatepickerCustomEvent<DatepickerKeyPressDetail>

export type DatepickerClickDetail = MouseEvent
export type DatepickerClick = DatepickerCustomEvent<DatepickerClickDetail>

export type DatepickerFocusDetail = FocusEvent
export type DatepickerFocus = DatepickerCustomEvent<DatepickerFocusDetail>
