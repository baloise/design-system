import { Element, Component, Method, h, Host, Prop, Event, EventEmitter, State, Watch } from '@stencil/core'
import { stopEventBubbling, raf, sanitizeSvg, Logger, type LogInstance, hasValue, OneOf, Required, Type } from '@utils'
import { AlertComponent } from '../alert-container.interfaces'
import { DsComponentInterface, DsConfigObserver, DsConfigState, ListenToConfig } from '@global'
import {
  ToastActionClickDetail,
  ToastCloseClickDetail,
  ToastColor,
  ToastDuration,
  TOAST_COLORS,
  TOAST_TARGETS,
} from './toast.interfaces'
import { ButtonTarget } from '../../button/button.interfaces'
import { HTMLStencilElement } from '@stencil/core/internal'

/**
 * Toast displays temporary notification messages that appear at the top of the page and auto-dismiss with optional action buttons and close control.
 *
 * @slot - The toast message content.
 * @slot action - The action button (if used).
 * @part toast - The toast container element.
 * @part close - The close button element.
 */
@Component({
  tag: 'ds-toast',
  styleUrl: 'toast.host.scss',
  shadow: true,
})
export class Toast implements DsComponentInterface, AlertComponent, DsConfigObserver {
  log!: LogInstance

  @Logger('toast')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  @State() animated = false
  @State() didLoad = false
  @State() didPause = false

  /**
   * Defines the color of the element
   * Color type primary is deprecated, please use info instead.
   */
  @Prop()
  @OneOf(TOAST_COLORS)
  readonly color: ToastColor = 'base'

  /**
   * If `true` the notification can be closed by the user.
   */
  @Prop()
  @Type('boolean')
  readonly closable: boolean = false

  /**
   * Defines the heading of the notification.
   */
  @Prop()
  @Required()
  @Type('string')
  readonly heading!: string

  /**
   * Defines the message of the notification as html content
   */
  @Prop()
  @Required()
  @Type('string')
  readonly message!: string

  /**
   * Defines the icon of the notification.
   */
  @Prop()
  @Type('string')
  readonly icon: string = ''

  /**
   * Defines the svg content of the icon
   */
  @Prop()
  @Type('string')
  readonly svg: string = ''

  /**
   * Defines the icon of the notification, if not provided it will be derived from the color property
   */
  @Prop()
  @Type('string')
  readonly action: string = ''

  /**
   * Defines the icon of the action button.
   */
  @Prop()
  @Type('string')
  readonly actionIcon: string = ''

  /**
   * Specifies where to open the linked document.
   */
  @Prop()
  @OneOf(TOAST_TARGETS)
  readonly actionTarget: ButtonTarget = '_blank'

  /**
   * Specifies the URL of the page the link goes to
   */
  @Prop()
  @Type('string')
  readonly actionHref: string = ''

  /**
   * @internal
   * The id of the toast, used for internal handling, if not provided a random id will be generated
   */
  @Prop()
  readonly alertId: string = crypto.randomUUID() as string

  /**
   * @internal
   * The duration of the toast in milliseconds.
   */
  @Prop()
  readonly duration: ToastDuration = 0

  /**
   * @internal
   * If `true` the notification is visible.
   */
  @Prop({ reflect: true })
  readonly visible: boolean = true

  /**
   * @internal Handler for on close event
   */
  @Prop() readonly closeHandler: (id: string) => void = () => void 0

  /**
   * @internal Handler for on action event
   */
  @Prop() readonly actionHandler: (id: string) => void = () => void 0

  /**
   * Emitted when the close button got clicked.
   */
  @Event() dsCloseClick!: EventEmitter<ToastCloseClickDetail>

  /**
   * Emitted when the action button got clicked.
   */
  @Event() dsActionClick!: EventEmitter<ToastActionClickDetail>

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
    if (hasValue(this.svg)) {
      return sanitizeSvg(this.svg)
    }
    return undefined
  }

  private generateIconName = () => {
    if (hasValue(this.icon)) {
      return this.icon
    } else {
      switch (this.color) {
        case 'info':
          return 'information'
        case 'success':
          return 'check'
        case 'warning':
          return 'alert'
        case 'danger':
          return 'alert'
        default:
          return 'bell'
      }
    }
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const iconName = this.generateIconName()
    const svgContent = this.generateSvgContent()

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
          [`is-action`]: hasValue(this.action),
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
        {!hasValue(svgContent) && (
          <ds-icon
            id="icon"
            part="icon"
            name={
              iconName || this.color === 'warning'
                ? 'alert'
                : this.color === 'danger'
                  ? 'alert'
                  : this.color === 'success'
                    ? 'check'
                    : this.color === 'info'
                      ? 'information'
                      : 'bell'
            }
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
        {hasValue(svgContent) && <ds-icon id="icon" part="icon" svg={svgContent}></ds-icon>}
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
        {hasValue(this.action) && (
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
