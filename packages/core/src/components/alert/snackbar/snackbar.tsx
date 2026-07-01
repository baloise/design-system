import { Element, Component, Method, h, Host, Prop, Event, EventEmitter, State } from '@stencil/core'
import {
  DsBreakpointObserver,
  DsBreakpoints,
  ListenToBreakpoints,
  dsBreakpoints,
  stopEventBubbling,
  sanitizeSvg,
  raf,
  Logger,
  type LogInstance,
  hasValue,
  OneOf,
  Type,
} from '@utils'
import { AlertComponent } from '../alert-container.interfaces'
import {
  SNACKBAR_COLORS,
  SnackbarActionClickDetail,
  SnackbarCloseClickDetail,
  SnackbarColor,
} from './snackbar.interfaces'
import { BUTTON_TARGETS, ButtonTarget } from '../../button/button.interfaces'
import { DsComponentInterface } from '@global'
import { HTMLStencilElement } from '@stencil/core/internal'

/**
 * Snackbar displays brief feedback messages at the bottom of the screen with optional action buttons and dismissal control.
 *
 * @slot - The snackbar message content.
 * @slot action - The action button (if used).
 * @part snackbar - The snackbar container element.
 * @part close - The close button element.
 */
@Component({
  tag: 'ds-snackbar',
  styleUrl: 'snackbar.host.scss',
  shadow: true,
})
export class Snackbar implements DsComponentInterface, AlertComponent, DsBreakpointObserver {
  log!: LogInstance

  @Logger('snackbar')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  @State() isMobile = dsBreakpoints.isMobile
  @State() mobileOpenState = false
  @State() didLoad = false

  /**
   * Defines the color of the element
   * Color type primary is deprecated, please use info instead.
   */
  @Prop()
  @OneOf(SNACKBAR_COLORS)
  readonly color: SnackbarColor = 'base'

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
  @Type('string')
  readonly heading: string = ''

  /**
   * Defines the message of the notification as html content
   */
  @Prop()
  @Type('string')
  readonly message: string = ''

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
  @OneOf(BUTTON_TARGETS)
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
  @Prop() readonly alertId: string = crypto.randomUUID() as string

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
  @Event() dsCloseClick!: EventEmitter<SnackbarCloseClickDetail>

  /**
   * Emitted when the action button got clicked.
   */
  @Event() dsActionClick!: EventEmitter<SnackbarActionClickDetail>

  /**
   * @internal
   * Emitted when the component has loaded.
   */
  @Event() dsDidLoad!: EventEmitter<void>

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
   * LISTENERS
   * ------------------------------------------------------
   */

  @ListenToBreakpoints()
  listenToBreakpoint(breakpoints: DsBreakpoints): void {
    this.isMobile = breakpoints.mobile
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
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private generateSvgContent = () => {
    if (hasValue(this.svg) && this.svg.length > 0) {
      return sanitizeSvg(this.svg)
    }
    return undefined
  }

  private generateIconName = () => {
    if (hasValue(this.icon) && this.icon.length > 0) {
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

    return (
      <Host
        role="status"
        aria-live="polite"
        aria-atomic="true"
        class={{
          [`is-ready`]: this.didLoad,
          [`is-visible`]: this.visible,
          [`is-closable`]: this.closable,
          [`is-mobile-open`]: this.isMobile && this.mobileOpenState,
          [`is-mobile-closed`]: this.isMobile && !this.mobileOpenState,
          [`is-${this.color}`]: hasValue(this.color),
        }}
      >
        {/* --------------------------------------*/}
        {/* Mobile                                */}
        {/* --------------------------------------*/}
        {this.isMobile && !this.mobileOpenState && (
          <ds-button
            id="mobile-button"
            color={this.color === 'base' ? 'primary' : this.color}
            square={true}
            icon={iconName}
            onClick={() => (this.mobileOpenState = true)}
          ></ds-button>
        )}
        {/* --------------------------------------*/}
        {/* Icon                                  */}
        {/* --------------------------------------*/}
        {iconName && !svgContent && (
          <ds-icon
            part="icon"
            id="icon"
            name={iconName}
            color={this.color}
            size={'xl'}
            shape={
              this.color === 'warning'
                ? 'triangle'
                : this.color === 'danger' || this.color === 'success' || this.color === 'info'
                  ? 'circle'
                  : undefined
            }
          ></ds-icon>
        )}
        {svgContent && <ds-icon id="icon" part="icon" svg={svgContent} size={'xl'}></ds-icon>}
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
        <ds-button-group part="action" id="action">
          <slot name="action" />
          {this.action && (
            <ds-button
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
              button
              button-color="secondary"
              part="close"
              size="sm"
              onClick={ev => {
                stopEventBubbling(ev)
                this.close()
              }}
            ></ds-close>
          )}
        </ds-button-group>
      </Host>
    )
  }
}
