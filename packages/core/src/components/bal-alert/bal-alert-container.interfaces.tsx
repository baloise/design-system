export type AlertType = 'toast' | 'snackbar'

export type AlertContainerSize = 'fluid' | 'detail-page' | 'compact' | 'blog-page' | 'wide'

export type AlertColors =
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

export type Alert = {
  color?: AlertColors
  heading?: string
  message?: string
  duration?: number | 'infinite'
  closable: boolean
  closeHandler: (id: string) => void
  action?: string
  actionIcon?: string
  actionTarget?: BalProps.BalButtonTarget
  actionHref?: string
  actionHandler: (id: string) => void
}

export type AlertComponent = Alert & {
  alertId: string
  visible: boolean
}
