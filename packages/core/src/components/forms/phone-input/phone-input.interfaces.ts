import { INPUT_COLORS } from '../input/input.interfaces'

export const PHONE_INPUT_COLORS = INPUT_COLORS

export type PhoneInputColor = (typeof PHONE_INPUT_COLORS)[number]

export type PhoneInputDetail = {
  value: string | null
  country: string
  nationalNumber: string
}

export type PhoneChangeDetail = PhoneInputDetail

export type PhoneCountryChangeDetail = {
  country: string
}

export type PhoneInputInputDetail = PhoneInputDetail
export type PhoneInputChangeDetail = PhoneChangeDetail
export type PhoneInputFocusDetail = FocusEvent
export type PhoneInputBlurDetail = FocusEvent
