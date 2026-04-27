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
import { DsBreakpointObserver, DsBreakpoints, ListenToBreakpoints, dsBreakpoints } from '../../../utils/breakpoints'
import { stopEventBubbling } from '../../../utils/form-control'
import { AlertComponent } from '../alert-container.interfaces'
import { sanitizeSvg } from '../../../utils/svg'
import { raf } from '../../../utils/helpers'
import { Loggable, Logger, LogInstance } from '../../../utils/log'

@Component({
  tag: 'ds-snackbar',
  styleUrl: 'snackbar.host.scss',
  shadow: true,
})
export class Snackbar implements ComponentInterface, AlertComponent, DsBreakpointObserver, Loggable {
  log!: LogInstance

  @Logger('snackbar')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() element!: HTMLDsSnackbarElement

  @State() isMobile = dsBreakpoints.isMobile
  @State() mobileOpenState = false
  @State() didLoad = false

  @State() svgContent?: string
  @State() iconName?: string

  private timer!: NodeJS.Timeout

  /**
   * Defines the color of the element
   * Color type primary is deprecated, please use info instead.
   */
  @Prop() readonly color?: DS.SnackbarColor

  /**
   * If `true` the notification can be closed by the user.
   */
  @Prop() readonly closable: boolean = true

  /**
   * Defines the heading of the notification.
   */
  @Prop() readonly heading?: string

  /**
   * Defines the message of the notification as html content
   */
  @Prop() readonly message?: string

  /**
   * Defines the icon of the notification.
   */
  @Prop() readonly icon?: string
  @Watch('icon')
  iconChanged() {
    this.generateIconName()
  }

  /**
   * Defines the svg content of the icon
   */
  @Prop() readonly svg?: string
  @Watch('svg')
  svgChanged() {
    this.generateSvgContent()
  }

  /**
   * Defines the icon of the notification, if not provided it will be derived from the color property
   */
  @Prop() readonly action?: string

  /**
   * Defines the icon of the action button.
   */
  @Prop() readonly actionIcon?: string

  /**
   * Specifies where to open the linked document.
   */
  @Prop() readonly actionTarget: DS.ButtonTarget = '_blank'

  /**
   * Specifies the URL of the page the link goes to
   */
  @Prop() readonly actionHref?: string

  /**
   * @internal
   * The id of the toast, used for internal handling, if not provided a random id will be generated
   */
  @Prop() readonly alertId = crypto.randomUUID() as string

  /**
   * @internal
   * If `true` the notification is visible.
   */
  @Prop({ reflect: true }) readonly visible: boolean = true

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
  @Event() dsCloseClick!: EventEmitter<DS.SnackbarCloseClickDetail>

  /**
   * Emitted when the action button got clicked.
   */
  @Event() dsActionClick!: EventEmitter<DS.SnackbarActionClickDetail>

  /**
   * @internal
   * Emitted when the component has loaded.
   */
  @Event() dsDidLoad!: EventEmitter<void>

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
   * LISTENERS
   * ------------------------------------------------------
   */

  @ListenToBreakpoints()
  breakpointListener(breakpoints: DsBreakpoints): void {
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
          [`is-${this.color}`]: this.color !== undefined,
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
            icon={this.iconName}
            onClick={() => (this.mobileOpenState = true)}
          ></ds-button>
        )}
        {/* --------------------------------------*/}
        {/* Icon                                  */}
        {/* --------------------------------------*/}
        {this.iconName && !this.svgContent && (
          <ds-icon
            part="icon"
            id="icon"
            name={this.iconName}
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
        {this.svgContent && <ds-icon id="icon" part="icon" svg={this.svgContent} size={'xl'}></ds-icon>}
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
