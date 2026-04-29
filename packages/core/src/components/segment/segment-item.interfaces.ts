export const SEGMENT_COLORS = ['', 'purple', 'green', 'yellow', 'red'] as const

export type SegmentColor = (typeof SEGMENT_COLORS)[number]

export interface SegmentItemCustomEvent<T> extends CustomEvent<T> {
  detail: T
  target: HTMLDsSegmentItemElement
}

// export type SegmentItemChangeDetail = boolean
// export type SegmentItemChange = SegmentItemCustomEvent<SegmentItemChangeDetail>

// export type SegmentItemFocusDetail = FocusEvent
// export type SegmentItemFocus = SegmentItemCustomEvent<SegmentItemFocusDetail>

// export type SegmentItemBlurDetail = FocusEvent
// export type SegmentItemBlur = SegmentItemCustomEvent<SegmentItemBlurDetail>

export interface SegmentCustomEvent<T> extends CustomEvent<T> {
  detail: T
  target: HTMLDsSegmentElement
}

export type SegmentChangeDetail = boolean
export type SegmentChange = SegmentCustomEvent<SegmentChangeDetail>

export type SegmentFocusDetail = FocusEvent
export type SegmentFocus = SegmentCustomEvent<SegmentFocusDetail>

export type SegmentBlurDetail = FocusEvent
export type SegmentBlur = SegmentCustomEvent<SegmentBlurDetail>
