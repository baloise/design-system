export const CHECKBOX_GROUP_COLUMNS = [1, 2, 3, 4] as const
export const CHECKBOX_TILE_COLORS = ['', 'purple', 'green', 'yellow', 'red'] as const
export const CHECKBOX_LABEL_POSITIONS = ['left', 'top', 'right'] as const

export type CheckboxGroupColumns = (typeof CHECKBOX_GROUP_COLUMNS)[number]
export type CheckboxTileColor = (typeof CHECKBOX_TILE_COLORS)[number]
export type CheckboxLabelPosition = (typeof CHECKBOX_LABEL_POSITIONS)[number]

export interface CheckboxCustomEvent<T> extends CustomEvent<T> {
  detail: T
  target: HTMLDsCheckboxElement
}

export type CheckboxChangeDetail = boolean
export type CheckboxChange = CheckboxCustomEvent<CheckboxChangeDetail>

export type CheckboxFocusDetail = FocusEvent
export type CheckboxFocus = CheckboxCustomEvent<CheckboxFocusDetail>

export type CheckboxBlurDetail = FocusEvent
export type CheckboxBlur = CheckboxCustomEvent<CheckboxBlurDetail>

export interface CheckboxGroupCustomEvent<T> extends CustomEvent<T> {
  detail: T
  target: HTMLDsCheckboxGroupElement
}

export type CheckboxGroupChangeDetail = any[]
export type CheckboxGroupChange = CheckboxGroupCustomEvent<CheckboxGroupChangeDetail>

export type CheckboxGroupFocusDetail = FocusEvent
export type CheckboxGroupFocus = CheckboxGroupCustomEvent<CheckboxGroupFocusDetail>

export type CheckboxGroupBlurDetail = FocusEvent
export type CheckboxGroupBlur = CheckboxGroupCustomEvent<CheckboxGroupBlurDetail>
