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
  Watch,
} from '@stencil/core'
import { stopEventBubbling } from '../../utils/form-input'
import { NotificationInterface } from '../bal-notification/bal-notification-container'
import { sanitizeSvg } from '../../utils/svg'

export interface NotificationComponentInterface extends Omit<NotificationInterface, 'id'> {}

@Component({
  tag: 'bal-snackbar',
  styleUrl: 'bal-snackbar.host.scss',
  shadow: true,
})
export class Snackbar implements ComponentInterface, NotificationComponentInterface {
  @Element() element!: HTMLBalSnackbarElement
  @State() didLoad = false
  @State() svgContent = ''
  @State() iconName = ''

  timer!: NodeJS.Timeout
  type = 'snackbar'

  /**
   * Defines the color of the element
   * Color type primary is deprecated, please use info instead.
   */
  @Prop({ reflect: true }) color: BalProps.BalSnackbarColor = ''

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
   * Defines the icon of the notification.
   */
  @Prop() icon = ''
  @Watch('icon')
  iconChanged() {
    this.generateIconName()
  }

  /**
   * Defines the svg content of the icon
   */
  @Prop() svg = ''
  @Watch('svg')
  svgChanged() {
    this.generateSvgContent()
  }

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
   * The duration of the snackbar in milliseconds.
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
  @Event() balCloseClick!: EventEmitter<BalEvents.BalSnackbarCloseClickDetail>

  /**
   * Emitted when the action button got clicked.
   */
  @Event() balActionClick!: EventEmitter<BalEvents.BalSnackbarActionClickDetail>

  /**
   * Emitted when the component has loaded.
   */
  @Event() balDidLoad!: EventEmitter<void>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback(): void {
    this.generateIconName()
    this.generateSvgContent()
  }

  componentDidLoad(): void {
    this.didLoad = true
    this.balDidLoad.emit()
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private generateSvgContent = () => {
    if (this.svg !== undefined && this.svg.length > 0) {
      this.svgContent = sanitizeSvg(this.svg)
    }
  }

  private generateIconName = () => {
    if (this.icon !== undefined && this.icon.length > 0) {
      this.iconName = this.icon
    } else {
      switch (this.color) {
        case 'success':
          this.iconName = 'check'
          break
        case 'warning':
          this.iconName = 'alert'
          break
        case 'danger':
          this.iconName = 'alert'
          break
        default:
          this.iconName = 'information'
      }
    }
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    return (
      <Host
        role="status"
        aria-live="polite"
        aria-atomic="true"
        class={{
          [`is-ready`]: this.didLoad,
        }}
      >
        {/* --------------------------------------*/}
        {/* Icon                                  */}
        {/* --------------------------------------*/}
        {this.iconName && !this.svgContent && <bal-icon part="icon" name={this.iconName}></bal-icon>}
        {this.svgContent && <bal-icon part="icon" svg={this.svgContent}></bal-icon>}
        {/* --------------------------------------*/}
        {/* Heading + Message                     */}
        {/* --------------------------------------*/}
        <div part="message">
          {this.heading && <h2>{this.heading}</h2>}
          <span>
            <slot>{this.message}</slot>
          </span>
        </div>
        {/* --------------------------------------*/}
        {/* Close Button                          */}
        {/* --------------------------------------*/}
        {this.closable && (
          <bal-close
            part="close"
            onClick={ev => {
              stopEventBubbling(ev)
              this.closeHandler()
              this.balCloseClick.emit()
            }}
          ></bal-close>
        )}
        {/* --------------------------------------*/}
        {/* Action Button                         */}
        {/* --------------------------------------*/}
        <div part="action" id="action">
          <slot name="action" />
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
                this.actionHandler()
                this.balActionClick.emit(ev)
              }}
            >
              {this.action}
            </bal-button>
          )}
        </div>
      </Host>
    )
  }
}
