import {
  Element,
  Component,
  Method,
  h,
  Host,
  Prop,
  Event,
  EventEmitter,
  ComponentInterface,
  State,
} from '@stencil/core'
import { stopEventBubbling } from '../../utils/form-input'
import { normalizeDeprecatedTShirtSize } from '../../utils/t-shirt'

@Component({
  tag: 'bal-notification',
  styleUrl: 'notification.host.scss',
  shadow: true,
})
export class Notification implements ComponentInterface {
  @Element() element!: HTMLBalNotificationElement
  @State() didLoad = false

  timer!: NodeJS.Timeout

  /**
   * Defines the color of the element
   * Color type primary is deprecated, please use info instead.
   */
  @Prop() color?: DS.NotificationColor

  /**
   * If `true` the notification will be displayed as an alert, otherwise as a status message.
   */
  @Prop() alert = false

  /**
   * If `true` the notification can be closed by the user.
   */
  @Prop() closable = false

  /**
   * If `true` there will be no icon provided
   */
  @Prop() noIcon = false

  /**
   * Defines the size of the notification, small, medium or large.
   */
  @Prop({ reflect: true, mutable: true }) size?: DS.NotificationSize
  watchSize(newValue: DS.NotificationSize) {
    this.size = normalizeDeprecatedTShirtSize(newValue) || undefined
  }

  /**
   * Defines the heading of the notification.
   */
  @Prop() heading?: string

  /**
   * @internal Handler for on close event
   */
  @Prop() closeHandler: () => void = () => void 0

  /**
   * Emitted when the close button got clicked.
   */
  @Event() dsCloseClick!: EventEmitter<DS.NotificationCloseClickDetail>

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
            <bal-close
              part="close"
              onClick={ev => {
                stopEventBubbling(ev)
                this.close()
              }}
            ></bal-close>
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
