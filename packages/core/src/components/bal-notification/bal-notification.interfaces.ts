/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace BalProps {
  export type BalNotificationType = 'toast' | 'snackbar' | ''
  export type BalNotificationSize = 'small' | 'medium' | 'large' | ''
  export type BalNotificationColor =
    | 'base'
    | 'info'
    | 'success'
    | 'warning'
    | 'danger'
    | 'outline-base'
    | 'outline-purple'
    | 'outline-green'
    | 'outline-yellow'
    | 'outline-red'
    | ''
}

namespace BalEvents {
  export interface BalNotificationCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalNotificationElement
  }

  export type BalNotificationCloseClickDetail = MouseEvent
  export type BalNotificationCloseClick = BalNotificationCustomEvent<BalNotificationCloseClickDetail>

  export type BalNotificationActionClickDetail = MouseEvent
  export type BalNotificationActionClick = BalNotificationCustomEvent<BalNotificationActionClickDetail>
}
