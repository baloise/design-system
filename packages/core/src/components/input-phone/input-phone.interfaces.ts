import { INPUT_COLORS } from '../input/input.interfaces'

export const INPUT_PHONE_COLORS = INPUT_COLORS

export type InputPhoneColor = (typeof INPUT_PHONE_COLORS)[number]

export type PhoneInputDetail = {
  value: string | null
  country: string
  nationalNumber: string
}

export type PhoneChangeDetail = PhoneInputDetail

export type PhoneCountryChangeDetail = {
  country: string
}

export type InputPhoneInputDetail = PhoneInputDetail
export type InputPhoneChangeDetail = PhoneChangeDetail
export type InputPhoneFocusDetail = FocusEvent
export type InputPhoneBlurDetail = FocusEvent
