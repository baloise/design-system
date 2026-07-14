export const DATE_COLORS = ['primary', 'danger', 'success', 'warning', ''] as const

export type DateColor = (typeof DATE_COLORS)[number]

export interface DateCustomEvent<T> extends CustomEvent<T> {
  detail: T
  target: HTMLElement
}

export type DateInputDetail = string | null
export type DateInput = DateCustomEvent<DateInputDetail>

export type DateChangeDetail = string | null
export type DateChange = DateCustomEvent<DateChangeDetail>

export type DateBlurDetail = FocusEvent
export type DateBlur = DateCustomEvent<DateBlurDetail>

export type DateKeyPressDetail = KeyboardEvent
export type DateKeyPress = DateCustomEvent<DateKeyPressDetail>

export type DateClickDetail = MouseEvent
export type DateClick = DateCustomEvent<DateClickDetail>

export type DateFocusDetail = FocusEvent
export type DateFocus = DateCustomEvent<DateFocusDetail>
