/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace DS {
  export const NOTIFICATION_SIZES = ['sm', 'md', 'lg', '', 'small', 'medium', 'large'] as const
  export const NOTIFICATION_COLORS = [
    'base',
    'info',
    'success',
    'warning',
    'danger',
    'outline-base',
    'outline-purple',
    'outline-green',
    'outline-yellow',
    'outline-red',
  ] as const

  export type NotificationSize = (typeof NOTIFICATION_SIZES)[number]
  export type NotificationColor = (typeof NOTIFICATION_COLORS)[number]

  export interface NotificationCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLDsNotificationElement
  }

  export type NotificationCloseClickDetail = MouseEvent
  export type NotificationCloseClick = NotificationCustomEvent<NotificationCloseClickDetail>

  export type NotificationActionClickDetail = MouseEvent
  export type NotificationActionClick = NotificationCustomEvent<NotificationActionClickDetail>
}
