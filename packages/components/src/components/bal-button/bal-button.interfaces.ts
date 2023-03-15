/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace BalProps {
  export type BalButtonGroupPosition = 'right' | 'center' | ''
  export type BalButtonGroupDirection = 'auto' | 'row' | 'column'
  export type BalButtonColor =
    | 'text'
    | 'primary'
    | 'info'
    | 'success'
    | 'warning'
    | 'danger'
    | 'link'
    | 'light'
    | 'primary-light'
    | 'info-light'
  export type BalButtonElementType = 'button' | 'reset' | 'submit'
  export type BalButtonSize = 'small' | ''
  export type BalButtonTarget = '_blank' | ' _parent' | '_self' | '_top'
}
