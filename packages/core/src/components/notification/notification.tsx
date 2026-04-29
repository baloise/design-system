import { Element, Component, Method, h, Host, Prop, Event, EventEmitter, State } from '@stencil/core'
import { stopEventBubbling, normalizeDeprecatedTShirtSize, Logger, type LogInstance } from '@utils'
import { NotificationCloseClickDetail, NotificationColor, NotificationSize } from './notification.interfaces'
import { DsComponentInterface } from '@global'
import { HTMLStencilElement } from '@stencil/core/internal'

@Component({
  tag: 'ds-notification',
  styleUrl: 'notification.host.scss',
  shadow: true,
})
export class Notification implements DsComponentInterface {
  log!: LogInstance

  @Logger('notification')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  @State() didLoad = false

  private timer!: NodeJS.Timeout

  /**
   * Defines the color of the element
   * Color type primary is deprecated, please use info instead.
   */
  @Prop() readonly color?: NotificationColor

  /**
   * If `true` the notification will be displayed as an alert, otherwise as a status message.
   */
  @Prop() readonly alert: boolean = false

  /**
   * If `true` the notification can be closed by the user.
   */
  @Prop() readonly closable: boolean = false

  /**
   * If `true` there will be no icon provided
   */
  @Prop() readonly noIcon: boolean = false

  /**
   * Defines the size of the notification, small, medium or large.
   */
  @Prop({ reflect: true, mutable: true }) size?: NotificationSize
  private watchSize(newValue: NotificationSize) {
    this.size = normalizeDeprecatedTShirtSize(newValue) || undefined
  }

  /**
   * Defines the heading of the notification.
   */
  @Prop() readonly heading: string = ''

  /**
   * @internal Handler for on close event
   */
  @Prop() readonly closeHandler: () => void = () => void 0

  /**
   * Emitted when the close button got clicked.
   */
  @Event() dsCloseClick!: EventEmitter<NotificationCloseClickDetail>

  /**
   * Emitted when the component has loaded.
   */
  @Event() dsDidLoad!: EventEmitter<void>

  connectedCallback(): void {
    this.size = normalizeDeprecatedTShirtSize(this.size) || ''
  }

  componentDidLoad(): void {
    this.didLoad = true
    this.dsDidLoad.emit()
  }

  /**
   * Closes this notification
   */
  @Method()
  async close(): Promise<void> {
    this.dsCloseClick.emit()
    this.closeHandler()
  }

  render() {
    let a11yAttributes = {}
    if (this.alert) {
      a11yAttributes = {
        'role': 'alert',
        'aria-live': 'assertive',
        'aria-atomic': 'true',
      }
    } else {
      a11yAttributes = {
        'role': 'status',
        'aria-live': 'polite',
        'aria-atomic': 'true',
      }
    }

    return (
      <Host
        {...a11yAttributes}
        class={{
          'has-no-icon': this.noIcon,
          [`is-${this.color}`]: !!this.color,
          [`is-${this.size}`]: !!this.size,
        }}
      >
        <section id="notification" part="section">
          {this.closable && (
            <ds-close
              part="close"
              onClick={ev => {
                stopEventBubbling(ev)
                this.close()
              }}
            ></ds-close>
          )}
          {this.heading && <h2 part="heading">{this.heading}</h2>}
          <span>
            <slot></slot>
          </span>
        </section>
      </Host>
    )
  }
}
