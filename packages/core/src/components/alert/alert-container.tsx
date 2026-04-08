import { Element, Component, Method, h, Host, Prop, ComponentInterface, State } from '@stencil/core'
import { raf, wait } from '../../utils/helpers'
import { Alert, AlertComponent, AlertType, AlertContainerSize } from './alert-container.interfaces'
import { createPausableTimer, PausableTimer } from '../../utils/timer'

@Component({
  tag: 'bal-alert-container',
  styleUrl: 'alert-container.host.scss',
  shadow: true,
})
export class AlertContainer implements ComponentInterface {
  private maxVisibleItems = 5
  private animationDurationMs = 300

  @Element() el!: HTMLBalAlertContainerElement
  containerEl: HTMLDivElement | undefined

  @State() alerts: AlertComponent[] = []
  private alertTimers: Record<string, PausableTimer> = {}

  @Prop() animated = false
  @Prop() type: AlertType = 'toast'
  @Prop() container?: AlertContainerSize

  @Method()
  async addAlert(alert: Alert): Promise<string> {
    if (this.hasDuplications(alert)) {
      return ''
    }

    const alertId = crypto.randomUUID() as string
    const duration = this.getDuration(alert)
    const component: AlertComponent = {
      ...alert,
      visible: false,
      duration,
      alertId,
    }

    this.alerts = [...this.alerts, component]

    this.activeTimer(alertId, duration)
    return alertId
  }

  @Method()
  async removeAlert(id: string) {
    this.alerts = this.alerts.map(n => (n.alertId === id ? { ...n, visible: false } : n))

    await wait(this.animationDurationMs)
    this.alerts = this.alerts.filter(n => n.alertId !== id)
  }

  @Method()
  async removeAll() {
    this.alerts = this.alerts.map(n => ({ ...n, visible: false }))

    await wait(this.animationDurationMs)
    this.alerts = []
  }

  private activeTimer(id: string, duration: number | 'infinite') {
    if (duration !== 'infinite') {
      this.alertTimers[id] = createPausableTimer(() => {
        this.removeAlert(id)
      }, duration + this.animationDurationMs)
    }
  }

  private getDuration(alert: Alert): number | 'infinite' {
    let duration: number | 'infinite' = 4000
    if (alert.duration === 'infinite' || alert.duration === 0) {
      duration = 'infinite'
    } else if (alert.duration === undefined) {
      //
      // Toasts
      if (this.type === 'toast') {
        if (alert.color === 'danger') {
          duration = 7000
        } else if (alert.color === 'warning') {
          duration = 5000
        }
      }
      //
      // Snackbars
      else {
        duration = 'infinite'
      }
    } else {
      duration = alert.duration
    }
    return duration
  }

  private present(id: string): void {
    raf(() => {
      this.alerts = this.alerts.map(n => (n.alertId === id ? { ...n, visible: true } : n))
    })
  }

  private hasDuplications(alert: Alert): boolean {
    const existing = this.alerts.find(
      n => n.color === alert.color && n.message === alert.message && n.heading === alert.heading,
    )
    return !!existing
  }

  render() {
    const visibleAlerts = this.alerts.slice(0, this.maxVisibleItems)
    const AlertElement = this.type === 'toast' ? 'bal-toast' : 'bal-snackbar'

    return (
      <Host
        class={{
          'is-toast': this.type === 'toast',
          'is-snackbar': this.type === 'snackbar',
        }}
      >
        <div id="wrapper" class={{ container: this.type === 'toast' }}>
          {visibleAlerts.map(alert => (
            <AlertElement
              key={alert.alertId}
              id={alert.alertId}
              alertId={alert.alertId}
              visible={alert.visible}
              heading={alert.heading}
              message={alert.message}
              color={alert.color as any}
              duration={alert.duration}
              closable={alert.closable}
              closeHandler={() => alert.closeHandler(alert.alertId)}
              action={alert.action}
              actionIcon={alert.actionIcon}
              actionTarget={alert.actionTarget}
              actionHref={alert.actionHref}
              actionHandler={() => alert.actionHandler(alert.alertId)}
              onBalCloseClick={() => this.removeAlert(alert.alertId)}
              onBalDidLoad={() => this.present(alert.alertId)}
              onBalDidPause={() => {
                this.alertTimers[alert.alertId] && this.alertTimers[alert.alertId].pause()
              }}
              onBalDidResume={() => {
                this.alertTimers[alert.alertId] && this.alertTimers[alert.alertId].resume()
              }}
            ></AlertElement>
          ))}
        </div>
      </Host>
    )
  }
}
