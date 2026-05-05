import { Element, Component, Method, h, Host, Prop, Event, EventEmitter, State, Watch } from '@stencil/core'
import {
  stopEventBubbling,
  normalizeDeprecatedTShirtSize,
  Logger,
  type LogInstance,
  ValidateEmptyOrOneOf,
  ValidateEmptyOrType,
  setupValidation,
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
  @ValidateEmptyOrType('boolean')
  readonly alert: boolean = false

  /**
   * If `true` the notification can be closed by the user.
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
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
  @ValidateEmptyOrOneOf(...NOTIFICATION_COLORS)
  readonly color?: NotificationColor

  /**
   * Defines the heading of the notification.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly heading: string = ''

  /**
   * If `true` there will be no icon provided
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly noIcon: boolean = false

  /**
   * Defines the size of the notification, small, medium or large.
   */
  @Prop({ mutable: true })
  @ValidateEmptyOrOneOf(...NOTIFICATION_SIZES)
  size?: NotificationSize
  @Watch('size')
  sizeChanged(newValue: NotificationSize) {
    this.size = normalizeDeprecatedTShirtSize(newValue) || undefined
  }

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

  connectedCallback(): void {
    setupValidation(this)
    this.size = normalizeDeprecatedTShirtSize(this.size) || undefined
  }

  componentWillUpdate() {
    setupValidation(this)
  }

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
