/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace DS {
  export type ButtonGroupAlignment = 'right' | 'center' | 'left'
  export type ButtonGroupDirection = 'auto' | 'row' | 'column'
  export type ButtonColor =
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'tertiary-purple'
    | 'tertiary-red'
    | 'tertiary-yellow'
    | 'tertiary-green'
    | 'link'
    | 'light'
    | 'success'
    | 'warning'
    | 'danger'
    | 'text' // deprecated
    | 'info' // deprecated
    | 'primary-light' // deprecated
    | 'info-light' // deprecated
  export type ButtonElementType = 'button' | 'reset' | 'submit'
  export type ButtonSize = 'sm' | '' | 'lg' | 'xl' | 'small' | undefined
  export type ButtonTarget = '_blank' | ' _parent' | '_self' | '_top'
  export type ButtonSpinner = 'logo' | 'circle' | true | false | undefined | ''
  export type ButtonAria = {
    controls?: string
    title?: string
    label?: string
    haspopup?: string
  }

  export interface ButtonCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLDsButtonElement
  }

  export type ButtonBlurDetail = void
  export type ButtonBlur = ButtonCustomEvent<ButtonBlurDetail>

  export type ButtonFocusDetail = void
  export type ButtonFocus = ButtonCustomEvent<ButtonFocusDetail>

  export type ButtonClickDetail = MouseEvent
  export type ButtonClick = ButtonCustomEvent<ButtonClickDetail>

  export type ButtonNavigateDetail = MouseEvent
  export type ButtonNavigate = ButtonCustomEvent<ButtonNavigateDetail>

  export type ButtonDidRenderDetail = void
  export type ButtonDidRender = ButtonCustomEvent<ButtonDidRenderDetail>
}
