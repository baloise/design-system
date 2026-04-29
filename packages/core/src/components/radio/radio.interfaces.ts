export const RADIO_GROUP_COLUMNS = [1, 2, 3, 4] as const
export const RADIO_TILE_COLORS = ['', 'purple', 'green', 'yellow', 'red'] as const
export const RADIO_LABEL_POSITIONS = ['left', 'top', 'right'] as const

export type RadioGroupColumns = (typeof RADIO_GROUP_COLUMNS)[number]
export type RadioTileColor = (typeof RADIO_TILE_COLORS)[number]
export type RadioLabelPosition = (typeof RADIO_LABEL_POSITIONS)[number]

export interface RadioCustomEvent<T> extends CustomEvent<T> {
  detail: T
  target: HTMLDsRadioElement
}

export type RadioChangeDetail = boolean
export type RadioChange = RadioCustomEvent<RadioChangeDetail>

export type RadioFocusDetail = FocusEvent
export type RadioFocus = RadioCustomEvent<RadioFocusDetail>

export type RadioBlurDetail = FocusEvent
export type RadioBlur = RadioCustomEvent<RadioBlurDetail>

export interface RadioGroupCustomEvent<T> extends CustomEvent<T> {
  detail: T
  target: HTMLDsRadioGroupElement
}

export type RadioGroupChangeDetail = boolean
export type RadioGroupChange = RadioGroupCustomEvent<RadioGroupChangeDetail>

export type RadioGroupFocusDetail = FocusEvent
export type RadioGroupFocus = RadioGroupCustomEvent<RadioGroupFocusDetail>

export type RadioGroupBlurDetail = FocusEvent
export type RadioGroupBlur = RadioGroupCustomEvent<RadioGroupBlurDetail>
