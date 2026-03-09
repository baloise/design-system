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
import { NotificationInterface } from '../bal-notification/bal-notification-container'

export interface NotificationComponentInterface extends Omit<NotificationInterface, 'id'> {}

@Component({
  tag: 'bal-toast',
  styleUrl: 'bal-toast.host.scss',
  shadow: true,
})
export class Toast implements ComponentInterface, NotificationComponentInterface {
  @Element() element!: HTMLBalToastElement
  @State() didLoad = false

  timer!: NodeJS.Timeout
  type = 'toast'

  /**
   * Defines the color of the element
   * Color type primary is deprecated, please use info instead.
   */
  @Prop({ reflect: true }) color: BalProps.BalToastColor = ''

  /**
   * If `true` the notification is visible.
   */
  @Prop({ reflect: true }) visible = true

  /**
   * If `true` the notification can be closed by the user.
   */
  @Prop({ reflect: true }) closable = false

  /**
   * Defines the heading of the notification.
   */
  @Prop() heading = ''

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
  @Event() balCloseClick!: EventEmitter<BalEvents.BalToastCloseClickDetail>

  /**
   * Emitted when the action button got clicked.
   */
  @Event() balActionClick!: EventEmitter<BalEvents.BalToastActionClickDetail>

  /**
   * Emitted when the component has loaded.
   */
  @Event() balDidLoad!: EventEmitter<void>

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
    return (
      <Host
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        class={{
          [`is-ready`]: this.didLoad,
        }}
      >
        <section id="toast" part="section">
          {this.heading && <h2 part="heading">{this.heading}</h2>}
          {this.heading && this.message && <p part="content">{this.message}</p>}
          {!this.heading && this.message && this.message}
          <span class={{ [`has-heading`]: !!this.heading }}>
            <slot></slot>
          </span>
          {/* --------------------------------------*/}
          {/* Action Button                          */}
          {/* --------------------------------------*/}
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
          {/* --------------------------------------*/}
          {/* Close Button                          */}
          {/* --------------------------------------*/}
          {this.closable && (
            <bal-close
              part="close"
              onClick={ev => {
                stopEventBubbling(ev)
                this.close()
              }}
            ></bal-close>
          )}
        </section>
      </Host>
    )
  }
}
