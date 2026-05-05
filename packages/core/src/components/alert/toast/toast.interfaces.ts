export const TOAST_COLORS = ['base', 'info', 'success', 'warning', 'danger'] as const
export const TOAST_TARGETS = ['_blank', '_parent', '_self', '_top'] as const

export type ToastColor = (typeof TOAST_COLORS)[number]
export type ToastDuration = number | 'infinite'

export interface ToastCustomEvent<T> extends CustomEvent<T> {
  detail: T
  target: HTMLDsToastElement
}

export type ToastCloseClickDetail = MouseEvent
export type ToastCloseClick = ToastCustomEvent<ToastCloseClickDetail>

export type ToastActionClickDetail = MouseEvent
export type ToastActionClick = ToastCustomEvent<ToastActionClickDetail>

export type ToastDidPauseDetail = void
export type ToastDidPause = ToastCustomEvent<ToastDidPauseDetail>

export type ToastDidResumeDetail = void
export type ToastDidResume = ToastCustomEvent<ToastDidResumeDetail>
