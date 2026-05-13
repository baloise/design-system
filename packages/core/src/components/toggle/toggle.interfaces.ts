export const TOGGLE_GROUP_COLUMNS = [1, 2, 3, 4] as const
export const TOGGLE_TILE_COLORS = ['', 'purple', 'green', 'yellow', 'red'] as const
export const TOGGLE_LABEL_POSITIONS = ['left', 'top', 'right'] as const

export type ToggleGroupColumns = (typeof TOGGLE_GROUP_COLUMNS)[number]
export type ToggleTileColor = (typeof TOGGLE_TILE_COLORS)[number]
export type ToggleLabelPosition = (typeof TOGGLE_LABEL_POSITIONS)[number]

export interface ToggleCustomEvent<T> extends CustomEvent<T> {
  detail: T
  target: HTMLDsToggleElement
}

export type ToggleChangeDetail = boolean
export type ToggleChange = ToggleCustomEvent<ToggleChangeDetail>

export type ToggleFocusDetail = FocusEvent
export type ToggleFocus = ToggleCustomEvent<ToggleFocusDetail>

export type ToggleBlurDetail = FocusEvent
export type ToggleBlur = ToggleCustomEvent<ToggleBlurDetail>

// export interface ToggleGroupCustomEvent<T> extends CustomEvent<T> {
//   detail: T
//   target: HTMLDsToggleGroupElement
// }

// export type ToggleGroupChangeDetail = boolean
// export type ToggleGroupChange = ToggleGroupCustomEvent<ToggleGroupChangeDetail>

// export type ToggleGroupFocusDetail = FocusEvent
// export type ToggleGroupFocus = ToggleGroupCustomEvent<ToggleGroupFocusDetail>

// export type ToggleGroupBlurDetail = FocusEvent
// export type ToggleGroupBlur = ToggleGroupCustomEvent<ToggleGroupBlurDetail>
