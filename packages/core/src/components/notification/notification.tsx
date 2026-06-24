import { Element, Component, Method, h, Host, Prop, Event, EventEmitter, State, Watch } from '@stencil/core'
import {
  stopEventBubbling,
  normalizeDeprecatedTShirtSize,
  Logger,
  type LogInstance,
  hasValue,
  OneOf,
  Type,
} from '@utils'
import {
  NOTIFICATION_COLORS,
  NOTIFICATION_SIZES,
  NotificationCloseClickDetail,
  NotificationColor,
  NotificationSize,
} from './notification.interfaces'
import { DsComponentInterface } from '@global'
import { HTMLStencilElement } from '@stencil/core/internal'

/**
 * Notification presents inline feedback messages for success, warning, error, or informational states with optional close action.
 *
 * @slot - The notification message content.
 * @part section - The notification container element.
 * @part close - The close button.
 * @part heading - The notification heading.
 */
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
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * If `true` the notification will be displayed as an alert, otherwise as a status message.
   */
  @Prop()
  @Type('boolean')
  readonly alert: boolean = false

  /**
   * If `true` the notification can be closed by the user.
   */
  @Prop()
  @Type('boolean')
  readonly closable: boolean = false

  /**
   * @internal Handler for on close event
   */
  @Prop() readonly closeHandler: () => void = () => void 0

  /**
   * Defines the color of the element
   * Color type primary is deprecated, please use info instead.
   */
  @Prop()
  @OneOf(NOTIFICATION_COLORS)
  readonly color: NotificationColor = ''

  /**
   * Defines the heading of the notification.
   */
  @Prop()
  @Type('string')
  readonly heading: string = ''

  /**
   * If `true` there will be no icon provided
   */
  @Prop()
  @Type('boolean')
  readonly noIcon: boolean = false

  /**
   * Defines the size of the notification, small, medium or large.
   */
  @Prop()
  @OneOf(NOTIFICATION_SIZES)
  readonly size?: NotificationSize

  /**
   * Emitted when the close button got clicked.
   */
  @Event() dsCloseClick!: EventEmitter<NotificationCloseClickDetail>

  /**
   * Emitted when the component has loaded.
   */
  @Event() dsDidLoad!: EventEmitter<void>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  componentDidLoad(): void {
    this.didLoad = true
    this.dsDidLoad.emit()
  }

  /**
   * PUBLIC METHODS
   * ------------------------------------------------------
   */

  /**
   * Closes this notification
   */
  @Method()
  async close(): Promise<void> {
    this.dsCloseClick.emit()
    this.closeHandler()
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const size = normalizeDeprecatedTShirtSize(this.size) || ''
    const a11yAttributes: { [key: string]: string } = this.alert
      ? { 'role': 'alert', 'aria-live': 'assertive', 'aria-atomic': 'true' }
      : { 'role': 'status', 'aria-live': 'polite', 'aria-atomic': 'true' }

    return (
      <Host
        {...a11yAttributes}
        class={{
          'has-no-icon': this.noIcon,
          [`is-${this.color}`]: hasValue(this.color),
          [`is-${size}`]: hasValue(this.size),
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
          {hasValue(this.heading) && <h2 part="heading">{this.heading}</h2>}
          <span>
            <slot></slot>
          </span>
        </section>
      </Host>
    )
  }
}
