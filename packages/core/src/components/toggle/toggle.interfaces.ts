export const TOGGLE_LABEL_POSITIONS = ['left', 'top', 'right'] as const

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
