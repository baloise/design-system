/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../interfaces.d.ts" />

namespace BalProps {
  export type BalInputAutocorrect = 'on' | 'off'
  export type BalInputInputMode = 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search'
  export type BalInputMask = 'contract-number' | 'claim-number' | 'offer-number' | 'be-enterprise-number' | 'be-iban'
  // From: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types
  export type BalInputInputType =
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'

  // From: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
  export type BalInputAutocomplete =
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
}

namespace BalEvents {
  export interface BalInputCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalInputElement
  }

  export type BalInputInputDetail = string | undefined
  export type BalInputInput = BalInputCustomEvent<BalInputInputDetail>

  export type BalInputChangeDetail = string | undefined
  export type BalInputChange = BalInputCustomEvent<BalInputChangeDetail>

  export type BalInputBlurDetail = FocusEvent
  export type BalInputBlur = BalInputCustomEvent<BalInputBlurDetail>

  export type BalInputKeyPressDetail = KeyboardEvent
  export type BalInputKeyPress = BalInputCustomEvent<BalInputKeyPressDetail>

  export type BalInputFocusDetail = FocusEvent
  export type BalInputFocus = BalInputCustomEvent<BalInputFocusDetail>
}
