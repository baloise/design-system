import { Element, Component, Method, h, Host, Prop, ComponentInterface, State } from '@stencil/core'
import { raf, wait } from '../../utils/helpers'

export interface Notification {
  message: string
  duration: number
  heading: string | undefined
  color: BalProps.BalNotificationColor | ''
  closeHandler: () => void
  action: string | undefined
  actionIcon: string | undefined
  actionTarget: BalProps.BalButtonTarget | undefined
  actionHref: string | undefined
  actionHandler: () => void
}

export interface NotificationInterface extends Notification {
  id: string
  type: BalProps.BalNotificationType
  closable: boolean
  visible: boolean
}

@Component({
  tag: 'bal-notification-container',
  styleUrl: 'bal-notification-container.host.scss',
  shadow: true,
})
export class NotificationContainer implements ComponentInterface {
  private maxVisibleItems = 5
  private animationDurationMs = 300

  @Element() el!: HTMLBalNotificationContainerElement
  containerEl: HTMLDivElement | undefined

  @State() notifications: NotificationInterface[] = []

  @Prop() type: BalProps.BalNotificationType = 'toast'
  @Prop() animated = false
  @Prop() container: 'fluid' | 'detail-page' | 'compact' | 'blog-page' | 'wide' | '' = ''

  @Method()
  async addNotification(notification: Notification): Promise<string> {
    if (this.hasDuplications(notification)) {
      return ''
    }

    const id = crypto.randomUUID()

    const component: NotificationInterface = {
      ...notification,
      type: this.type || 'toast',
      closable: true,
      visible: false,
      id,
    }

    this.notifications = [...this.notifications, component]

    // Automatically remove the notification after the specified duration
    if (notification.duration > 0) {
      setTimeout(() => {
        this.removeNotification(id)
      }, notification.duration + this.animationDurationMs)
    }

    return id
  }

  @Method()
  async removeNotification(id: string) {
    this.notifications = this.notifications.map(n => (n.id === id ? { ...n, visible: false } : n))

    await wait(this.animationDurationMs)
    this.notifications = this.notifications.filter(n => n.id !== id)
  }

  @Method()
  async removeAll() {
    this.notifications = this.notifications.map(n => ({ ...n, visible: false }))

    await wait(this.animationDurationMs)
    this.notifications = []
  }

  private present(id: string): void {
    raf(() => {
      this.notifications = this.notifications.map(n => (n.id === id ? { ...n, visible: true } : n))
    })
  }

  private hasDuplications(notification: Notification): boolean {
    const existing = this.notifications.find(
      n => n.color === notification.color && n.message === notification.message && n.heading === notification.heading,
    )
    return !!existing
  }

  render() {
    console.debug('Render notice container', this.type, this.animated, this.container)

    const visibleNotifications = this.notifications.slice(0, this.maxVisibleItems)

    return (
      <Host
        class={{
          'is-toast': this.type === 'toast',
          'is-snackbar': this.type === 'snackbar',
        }}
      >
        <div id="wrapper" class={{ container: this.type === 'toast' }}>
          {visibleNotifications.map(notification => (
            <bal-notification
              key={notification.id}
              id={notification.id}
              visible={notification.visible}
              heading={notification.heading}
              message={notification.message}
              color={notification.color}
              duration={notification.duration}
              type={notification.type}
              closable={notification.closable}
              closeHandler={notification.closeHandler}
              action={notification.action}
              actionIcon={notification.actionIcon}
              actionTarget={notification.actionTarget}
              actionHref={notification.actionHref}
              actionHandler={notification.actionHandler}
              onBalCloseClick={() => this.removeNotification(notification.id)}
              onBalDidLoad={() => this.present(notification.id)}
            ></bal-notification>
          ))}
        </div>
      </Host>
    )
  }
}
