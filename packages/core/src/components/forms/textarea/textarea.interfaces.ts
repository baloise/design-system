import { InputInputMode } from '../input/input.interfaces'

export const TEXTAREA_WRAPS = ['hard', 'soft', 'off'] as const

export type TextareaWrap = (typeof TEXTAREA_WRAPS)[number]
export type TextareaInputMode = InputInputMode

export interface TextareaCustomEvent<T> extends CustomEvent<T> {
  detail: T
  target: HTMLDsTextareaElement
}

export type TextareaInputDetail = string | null
export type TextareaInput = TextareaCustomEvent<TextareaInputDetail>

export type TextareaChangeDetail = string | null
export type TextareaChange = TextareaCustomEvent<TextareaChangeDetail>

export type TextareaBlurDetail = FocusEvent
export type TextareaBlur = TextareaCustomEvent<TextareaBlurDetail>

export type TextareaKeyPressDetail = KeyboardEvent
export type TextareaKeyPress = TextareaCustomEvent<TextareaKeyPressDetail>

export type TextareaFocusDetail = FocusEvent
export type TextareaFocus = TextareaCustomEvent<TextareaFocusDetail>

export type TextareaClickDetail = MouseEvent
export type TextareaClick = TextareaCustomEvent<TextareaClickDetail>
