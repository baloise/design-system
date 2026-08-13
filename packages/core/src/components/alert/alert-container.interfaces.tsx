import { ButtonTarget } from '../button/button.interfaces'

export const ALERT_TYPES = ['toast', 'snackbar'] as const

export const ALERT_CONTAINER_SIZES = ['fluid', 'detail-page', 'compact', 'blog-page', 'wide'] as const

export const ALERT_COLORS = [
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

export type AlertType = (typeof ALERT_TYPES)[number]

export type AlertContainerSize = (typeof ALERT_CONTAINER_SIZES)[number]

export type AlertColors = (typeof ALERT_COLORS)[number]

export type Alert = {
  color?: AlertColors
  heading: string
  message: string
  duration?: number | 'infinite'
  closable: boolean
  closeHandler: (id: string) => void
  action?: string
  actionIcon?: string
  actionTarget?: ButtonTarget
  actionHref?: string
  actionHandler: (id: string) => void
}

export type AlertComponent = Alert & {
  alertId: string
  visible: boolean
}
