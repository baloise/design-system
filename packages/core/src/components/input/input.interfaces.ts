/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace DS {
  export const INPUT_COLORS = ['primary', 'danger', 'success', 'warning'] as const
  export const INPUT_AUTOCORRECTS = ['on', 'off'] as const
  export const INPUT_INPUT_MODES = ['none', 'text', 'tel', 'url', 'email', 'numeric', 'decimal', 'search'] as const
  export const INPUT_MASKS = [
    'vehicle-registration-number',
    'contract-number',
    'basic-contract-number',
    'claim-number',
    'offer-number',
    'be-enterprise-number',
    'be-iban',
  ] as const
  // From: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types
  export const INPUT_INPUT_TYPES = [
    'color',
    'date',
    'datetime-local',
    'email',
    'file',
    'image',
    'month',
    'number',
    'password',
    'range',
    'search',
    'tel',
    'text',
    'time',
    'url',
    'week',
  ] as const

  // From: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
  export const INPUT_AUTOCOMPLETES = [
    'on',
    'off',
    'name',
    'honorific-prefix',
    'given-name',
    'additional-name',
    'family-name',
    'honorific-suffix',
    'nickname',
    'email',
    'username',
    'new-password',
    'current-password',
    'one-time-code',
    'organization-title',
    'organization',
    'street-address',
    'address-line1',
    'address-line2',
    'address-line3',
    'address-level4',
    'address-level3',
    'address-level2',
    'address-level1',
    'country',
    'country-name',
    'postal-code',
    'cc-name',
    'cc-given-name',
    'cc-additional-name',
    'cc-family-name',
    'cc-number',
    'cc-exp',
    'cc-exp-month',
    'cc-exp-year',
    'cc-csc',
    'cc-type',
    'transaction-currency',
    'transaction-amount',
    'language',
    'bday',
    'bday-day',
    'bday-month',
    'bday-year',
    'sex',
    'tel',
    'tel-country-code',
    'tel-national',
    'tel-area-code',
    'tel-local',
    'tel-extension',
    'impp',
    'url',
    'photo',
  ] as const

  export type InputColor = (typeof INPUT_COLORS)[number]
  export type InputAutocorrect = (typeof INPUT_AUTOCORRECTS)[number]
  export type InputInputMode = (typeof INPUT_INPUT_MODES)[number]
  export type InputMask = (typeof INPUT_MASKS)[number]
  export type InputInputType = (typeof INPUT_INPUT_TYPES)[number]
  export type InputAutocomplete = (typeof INPUT_AUTOCOMPLETES)[number]

  export interface InputCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLDsInputElement
  }

  export type InputInputDetail = string | null
  export type InputInput = InputCustomEvent<InputInputDetail>

  export type InputChangeDetail = string | null
  export type InputChange = InputCustomEvent<InputChangeDetail>

  export type InputBlurDetail = FocusEvent
  export type InputBlur = InputCustomEvent<InputBlurDetail>

  export type InputKeyPressDetail = KeyboardEvent
  export type InputKeyPress = InputCustomEvent<InputKeyPressDetail>

  export type InputClickDetail = MouseEvent
  export type InputClick = InputCustomEvent<InputClickDetail>

  export type InputFocusDetail = FocusEvent
  export type InputFocus = InputCustomEvent<InputFocusDetail>

  // export interface InputDateCustomEvent<T> extends CustomEvent<T> {
  //   detail: T
  //   target: HTMLDsInputDateElement
  // }

  // export type InputDateInputDetail = string | undefined
  // export type InputDateInput = InputDateCustomEvent<InputDateInputDetail>

  // export type InputDateChangeDetail = string | undefined
  // export type InputDateChange = InputDateCustomEvent<InputDateChangeDetail>

  // export type InputDateBlurDetail = FocusEvent
  // export type InputDateBlur = InputDateCustomEvent<InputDateBlurDetail>

  // export type InputDateKeyPressDetail = KeyboardEvent
  // export type InputDateKeyPress = InputDateCustomEvent<InputDateKeyPressDetail>

  // export type InputDateFocusDetail = FocusEvent
  // export type InputDateFocus = InputDateCustomEvent<InputDateFocusDetail>
}
