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
import { NotificationInterface } from './bal-notification-container'
import { normalizeDeprecatedTShirtSize } from '../../utils/t-shirt'

export interface NotificationComponentInterface extends Omit<NotificationInterface, 'id'> {}

@Component({
  tag: 'bal-notification',
  styleUrl: 'bal-notification.host.scss',
  shadow: true,
})
export class Notification implements ComponentInterface, NotificationComponentInterface {
  @Element() element!: HTMLBalNotificationElement
  @State() didLoad = false

  timer!: NodeJS.Timeout

  /**
   * Defines the color of the element
   * Color type primary is deprecated, please use info instead.
   */
  @Prop() color: BalProps.BalNotificationColor = ''

  /**
   * Defines the type of the notification, alert or snackbar.
   * Alert is used for important messages that require immediate attention,
   * while snackbar is used for less important messages that can be ignored by the user.
   */
  @Prop() type: BalProps.BalNotificationType = ''

  /**
   * If `true` the notification is visible.
   */
  @Prop() visible = true

  /**
   * If `true` the notification can be closed by the user.
   */
  @Prop() closable = false

  /**
   * If `true` there will be no icon provided
   */
  @Prop() noIcon = false

  /**
   * Defines the heading of the notification.
   */
  @Prop() heading = ''

  /**
   * Defines the size of the notification, small, medium or large.
   */
  @Prop({ mutable: true }) size: BalProps.BalNotificationSize = ''
  watchSize(newValue: BalProps.BalNotificationSize) {
    this.size = normalizeDeprecatedTShirtSize(newValue) || ''
  }

  /**
   * Defines the message of the notification as html content
   */
  @Prop() message = ''

  /**
   * Defines the icon of the notification, if not provided it will be derived from the color property
   */
  @Prop() action = ''

  /**
   * Defines the icon of the action button.
   */
  @Prop() actionIcon = ''

  /**
   * Specifies where to open the linked document.
   */
  @Prop() actionTarget: BalProps.BalButtonTarget = '_blank'

  /**
   * Specifies the URL of the page the link goes to
   */
  @Prop() actionHref = ''

  /**
   * The duration of the toast in milliseconds.
   */
  @Prop() duration = 0

  /**
   * @internal Handler for on close event
   */
  @Prop() closeHandler: () => void = () => void 0

  /**
   * @internal Handler for on action event
   */
  @Prop() actionHandler: () => void = () => void 0

  /**
   * Emitted when the close button got clicked.
   */
  @Event() balCloseClick!: EventEmitter<BalEvents.BalNotificationCloseClickDetail>

  /**
   * Emitted when the action button got clicked.
   */
  @Event() balActionClick!: EventEmitter<BalEvents.BalNotificationActionClickDetail>

  /**
   * Emitted when the component has loaded.
   */
  @Event() balDidLoad!: EventEmitter<void>

  connectedCallback(): void {
    this.size = normalizeDeprecatedTShirtSize(this.size) || ''
  }

  componentDidLoad(): void {
    this.didLoad = true
    this.balDidLoad.emit()
  }

  /**
   * Closes this notification
   */
  @Method()
  async close(): Promise<void> {
    this.balCloseClick.emit()
    this.closeHandler()
  }

  render() {
    let a11yAttributes = {}
    if (this.type === 'toast') {
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
          [`has-heading`]: !!this.heading,
          [`is-visible`]: !!this.visible,
          [`is-ready`]: this.didLoad,
        }}
      >
        <section
          id="notification"
          class={{
            'has-no-icon': this.noIcon,
            'is-toast': this.type === 'toast',
            'is-snackbar': this.type === 'snackbar',
            [`is-${this.color}`]: !!this.color,
            [`is-${this.size}`]: !!this.size,
          }}
          part="section"
        >
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
          {this.heading && this.message && <p part="content">{this.message}</p>}
          {!this.heading && this.message && this.message}
          <slot></slot>
          {this.action && (
            <bal-button
              color="primary"
              size="sm"
              part="button"
              icon={this.actionIcon}
              target={this.actionTarget}
              href={this.actionHref}
              onClick={ev => {
                stopEventBubbling(ev)
                this.balActionClick.emit(ev)
              }}
            >
              {this.action}
            </bal-button>
          )}
        </section>
      </Host>
    )
  }
}
