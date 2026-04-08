/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../interfaces.d.ts" />

namespace DS {
  export type ToastColor = 'base' | 'info' | 'success' | 'warning' | 'danger'
  export type ToastDuration = number | 'infinite'

  export interface ToastCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalToastElement
  }

  export type ToastCloseClickDetail = MouseEvent
  export type ToastCloseClick = ToastCustomEvent<ToastCloseClickDetail>

  export type ToastActionClickDetail = MouseEvent
  export type ToastActionClick = ToastCustomEvent<ToastActionClickDetail>

  export type ToastDidPauseDetail = void
  export type ToastDidPause = ToastCustomEvent<ToastDidPauseDetail>

  export type ToastDidResumeDetail = void
  export type ToastDidResume = ToastCustomEvent<ToastDidResumeDetail>
}
