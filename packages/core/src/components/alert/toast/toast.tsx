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
import { stopEventBubbling } from '../../../utils/form-input'
import { AlertComponent } from '../alert-container.interfaces'
import { raf } from '../../../utils/helpers'
import { sanitizeSvg } from '../../../utils/svg'
import { DsConfigObserver, DsConfigState, ListenToConfig } from '../../../utils/config'
import { Loggable, Logger, LogInstance } from '../../../utils/log'

@Component({
  tag: 'ds-toast',
  styleUrl: 'toast.host.scss',
  shadow: true,
})
export class Toast implements ComponentInterface, AlertComponent, DsConfigObserver, Loggable {
  log!: LogInstance

  @Logger('toast')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() element!: HTMLDsToastElement

  @State() animated = false
  @State() didLoad = false
  @State() didPause = false

  @State() svgContent?: string
  @State() iconName?: string

  timer!: NodeJS.Timeout

  /**
   * Defines the color of the element
   * Color type primary is deprecated, please use info instead.
   */
  @Prop() color?: DS.ToastColor

  /**
   * If `true` the notification can be closed by the user.
   */
  @Prop() closable = false

  /**
   * Defines the heading of the notification.
   */
  @Prop() heading?: string

  /**
   * Defines the message of the notification as html content
   */
  @Prop() message?: string

  /**
   * Defines the icon of the notification.
   */
  @Prop() icon?: string
  @Watch('icon')
  iconChanged() {
    this.generateIconName()
  }

  /**
   * Defines the svg content of the icon
   */
  @Prop() svg?: string
  @Watch('svg')
  svgChanged() {
    this.generateSvgContent()
  }

  /**
   * Defines the icon of the notification, if not provided it will be derived from the color property
   */
  @Prop() action?: string

  /**
   * Defines the icon of the action button.
   */
  @Prop() actionIcon?: string

  /**
   * Specifies where to open the linked document.
   */
  @Prop() actionTarget: DS.ButtonTarget = '_blank'

  /**
   * Specifies the URL of the page the link goes to
   */
  @Prop() actionHref?: string

  /**
   * @internal
   * The id of the toast, used for internal handling, if not provided a random id will be generated
   */
  @Prop() alertId = crypto.randomUUID() as string

  /**
   * @internal
   * The duration of the toast in milliseconds.
   */
  @Prop() duration: DS.ToastDuration = 0

  /**
   * @internal
   * If `true` the notification is visible.
   */
  @Prop({ reflect: true }) visible = true

  /**
   * @internal Handler for on close event
   */
  @Prop() closeHandler: (id: string) => void = () => void 0

  /**
   * @internal Handler for on action event
   */
  @Prop() actionHandler: (id: string) => void = () => void 0

  /**
   * Emitted when the close button got clicked.
   */
  @Event() dsCloseClick!: EventEmitter<DS.ToastCloseClickDetail>

  /**
   * Emitted when the action button got clicked.
   */
  @Event() dsActionClick!: EventEmitter<DS.ToastActionClickDetail>

  /**
   * @internal
   * Emitted when the component has loaded.
   */
  @Event() dsDidLoad!: EventEmitter<void>

  /**
   * @internal
   * Emitted when the alert got paused, either by mouse enter or by calling the pause method.
   */
  @Event() dsDidPause!: EventEmitter<void>

  /**
   * @internal
   * Emitted when the alert got resumed, either by mouse leave or by calling the resume method.
   */
  @Event() dsDidResume!: EventEmitter<void>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback(): void {
    this.generateIconName()
    this.generateSvgContent()
  }

  componentDidLoad(): void {
    raf(() => {
      this.didLoad = true
      this.dsDidLoad.emit()
    })
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
    this.closeHandler(this.alertId)
  }

  /**
   * @internal define config for the component
   */
  @Method()
  @ListenToConfig()
  async configChanged(state: DsConfigState): Promise<void> {
    this.animated = state.animated
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
        case 'info':
          this.iconName = 'information'
          break
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
          this.iconName = 'bell'
      }
    }
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const hasDuration = this.duration !== undefined && this.duration !== 'infinite' && this.duration > 0
    const hasProgressBar = this.visible && this.didLoad && hasDuration

    const durationVariable = hasDuration
      ? {
          '--toast-progress-duration': `${this.duration}ms`,
        }
      : {}

    return (
      <Host
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        class={{
          [`is-ready`]: this.didLoad,
          [`is-paused`]: this.didPause,
          [`is-visible`]: this.visible,
          [`has-progress-bar`]: hasProgressBar && this.animated,
          [`is-closable`]: this.closable,
          [`is-action`]: this.action !== undefined,
          [`is-${this.color}`]: this.color !== undefined,
        }}
        style={durationVariable}
        onMouseEnter={() => {
          this.didPause = true
          this.dsDidPause.emit()
        }}
        onMouseLeave={() => {
          this.didPause = false
          this.dsDidResume.emit()
        }}
      >
        {/* --------------------------------------*/}
        {/* Icon                                  */}
        {/* --------------------------------------*/}
        {this.iconName && !this.svgContent && (
          <ds-icon
            id="icon"
            part="icon"
            name={this.iconName}
            color={this.color}
            size="md"
            shape={
              this.color === 'warning'
                ? 'triangle'
                : this.color === 'danger' || this.color === 'success' || this.color === 'info'
                  ? 'circle'
                  : undefined
            }
          ></ds-icon>
        )}
        {this.svgContent && <ds-icon id="icon" part="icon" svg={this.svgContent}></ds-icon>}
        {/* --------------------------------------*/}
        {/* Heading + Message                     */}
        {/* --------------------------------------*/}
        <span part="content" id="content">
          {this.heading && <h2 part="heading">{this.heading}</h2>}
          <span part="message">
            {this.message}
            <slot></slot>
          </span>
        </span>
        {/* --------------------------------------*/}
        {/* Action Button                         */}
        {/* --------------------------------------*/}
        {this.action && (
          <ds-button
            id="action"
            color="primary"
            size="sm"
            part="button"
            icon={this.actionIcon}
            target={this.actionTarget}
            href={this.actionHref}
            onClick={ev => {
              stopEventBubbling(ev)
              this.dsActionClick.emit(ev)
              this.actionHandler(this.alertId)
            }}
          >
            {this.action}
          </ds-button>
        )}
        {/* --------------------------------------*/}
        {/* Close Button                          */}
        {/* --------------------------------------*/}
        {this.closable && (
          <ds-close
            part="close"
            onClick={ev => {
              stopEventBubbling(ev)
              this.close()
            }}
          ></ds-close>
        )}
      </Host>
    )
  }
}
