/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace DS {
  export type InputAutocorrect = 'on' | 'off'
  export type InputInputMode = 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search'
  export type InputMask =
    | 'vehicle-registration-number'
    | 'contract-number'
    | 'basic-contract-number'
    | 'claim-number'
    | 'offer-number'
    | 'be-enterprise-number'
    | 'be-iban'
  // From: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types
  export type InputInputType =
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'range'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'

  // From: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
  export type InputAutocomplete =
    | 'on'
    | 'off'
    | 'name'
    | 'honorific-prefix'
    | 'given-name'
    | 'additional-name'
    | 'family-name'
    | 'honorific-suffix'
    | 'nickname'
    | 'email'
    | 'username'
    | 'new-password'
    | 'current-password'
    | 'one-time-code'
    | 'organization-title'
    | 'organization'
    | 'street-address'
    | 'address-line1'
    | 'address-line2'
    | 'address-line3'
    | 'address-level4'
    | 'address-level3'
    | 'address-level2'
    | 'address-level1'
    | 'country'
    | 'country-name'
    | 'postal-code'
    | 'cc-name'
    | 'cc-given-name'
    | 'cc-additional-name'
    | 'cc-family-name'
    | 'cc-family-name'
    | 'cc-number'
    | 'cc-exp'
    | 'cc-exp-month'
    | 'cc-exp-year'
    | 'cc-csc'
    | 'cc-type'
    | 'transaction-currency'
    | 'transaction-amount'
    | 'language'
    | 'bday'
    | 'bday-day'
    | 'bday-month'
    | 'bday-year'
    | 'sex'
    | 'tel'
    | 'tel-country-code'
    | 'tel-national'
    | 'tel-area-code'
    | 'tel-local'
    | 'tel-extension'
    | 'impp'
    | 'url'
    | 'photo'

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
