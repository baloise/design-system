import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  FunctionalComponent,
  Host,
  Method,
  Prop,
  State,
  Watch,
  h,
} from '@stencil/core'
import {
  DsBreakpointObserver,
  DsBreakpoints,
  ListenToBreakpoints,
  dsBreakpoints,
  Loggable,
  Logger,
  LogInstance,
} from '@utils'
import { DsConfigState, DsLanguage, ListenToConfig, defaultConfig } from '@global'
import { i18nControlLabel } from './pagination.i18n'
import { generatePaginationControl } from './pagination.util'

@Component({
  tag: 'ds-pagination',
  styleUrl: 'pagination.host.scss',
  shadow: true,
})
export class Pagination implements ComponentInterface, DsBreakpointObserver, Loggable {
  log!: LogInstance

  @Logger('ds-pagination')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLDsPaginationElement

  @State() _value = 1
  @State() isMobile = dsBreakpoints.isMobile
  @State() language: DsLanguage = defaultConfig.language

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * Align the buttons to start, center or end
   */
  @Prop() readonly align: DS.PaginationAlignment = ''

  /**
   * Size of the buttons
   */
  @Prop() readonly size: DS.PaginationSize = ''

  /**
   * Defines the layout of the pagination
   */
  @Prop() readonly variant: DS.PaginationVariant = ''

  /**
   * Disables component
   */
  @Prop() readonly disabled = false

  /**
   * Current selected page
   */
  @Prop() value = 1

  @Watch('value')
  valueChanged(newValue: number) {
    this._value = newValue
  }

  /**
   * The total amount of pages
   */
  @Prop() readonly totalPages = 1

  /**
   * Specify the max visible pages before and after the selected page
   */
  @Prop() readonly pageRange = 2

  /**
   * If 'true, the pagination will be sticky to the top
   */
  @Prop() readonly sticky = false

  /**
   * If sticky, the top position will be determined by this value
   */
  @Prop() readonly top: number = 0

  @Watch('top')
  topValueChanged(newValue: number) {
    if (this.sticky) {
      this.el.style.top = `${newValue}px`
    }
  }

  /**
   * The label for the navigation landmark
   */
  @Prop() readonly label: string = ''

  /**
   * The label for the previous page button
   */
  @Prop() readonly textPrevious: string = ''

  /**
   * The label for the next page button
   */
  @Prop() readonly textNext: string = ''

  /**
   * Triggers when a page change happens
   */
  @Event({ eventName: 'dsChange' }) dsChangeEventEmitter!: EventEmitter<DS.PaginationChangeDetail>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  componentWillLoad() {
    this._value = this.value
    this.topValueChanged(this.top)
  }

  @ListenToBreakpoints()
  listenToBreakpoint(breakpoints: DsBreakpoints): void {
    this.isMobile = breakpoints.mobile
  }

  /**
   * PUBLIC METHODS
   * ------------------------------------------------------
   */

  /**
   * Go to the next page
   */
  @Method()
  async next() {
    if (this._value < this.totalPages) {
      this._value = this._value + 1
      this.dsChangeEventEmitter.emit(this._value)
    }
  }

  /**
   * Go to the previous page
   */
  @Method()
  async previous() {
    if (this._value !== 1) {
      this._value = this._value - 1
      this.dsChangeEventEmitter.emit(this._value)
    }
  }

  /**
   * @internal define config for the component
   */
  @Method()
  @ListenToConfig()
  async configChanged(state: DsConfigState): Promise<void> {
    this.language = state.language
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private selectPage(pageNumber: number) {
    this._value = pageNumber
    this.dsChangeEventEmitter.emit(this._value)
  }

  private getItems(pageRange = 2) {
    const controls = generatePaginationControl(this._value, this.totalPages, pageRange)
    return controls.map((control: any) => {
      if (control.type === 'page') {
        return this.renderPageElement(Number(control.label))
      } else {
        return this.renderEllipsisElement()
      }
    })
  }

  private renderEllipsisElement() {
    return (
      <li aria-hidden="true">
        <div id="ellipsis" part="ellipsis">
          <span>&hellip;</span>
        </div>
      </li>
    )
  }

  private renderPageElement(pageNumber: number) {
    const isActive = this._value === pageNumber

    if (this.variant === 'dots') {
      return (
        <li>
          <button
            part="page"
            class={{
              'dot': true,
              'is-active': isActive,
              'is-inactive': !isActive,
            }}
            aria-current={isActive ? 'true' : undefined}
            aria-label={pageNumber.toString()}
            title={pageNumber.toString()}
            onClick={() => this.selectPage(pageNumber)}
          />
        </li>
      )
    }
    return (
      <li>
        <button
          part="page"
          class={{
            'button': true,
            'is-square': true,
            'is-primary': isActive,
            'is-text': !isActive,
            'is-disabled': this.disabled,
            'is-sm': this.isMobile || this.size === 'sm',
          }}
          aria-current={isActive ? 'true' : undefined}
          onClick={() => this.selectPage(pageNumber)}
        >
          {pageNumber}
        </button>
      </li>
    )
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const items = this.isMobile ? this.getItems(1) : this.getItems(this.pageRange)

    const isVariantDots = this.variant === 'dots'
    const buttonColor = isVariantDots ? 'is-link' : 'is-text'
    const buttonSize = isVariantDots || this.size === 'sm' || this.isMobile ? 'is-sm' : ''
    const flat = isVariantDots

    const labelControlTitle = this.label || i18nControlLabel[this.language].label
    const leftControlTitle = this.textPrevious || i18nControlLabel[this.language].left
    const rightControlTitle = this.textNext || i18nControlLabel[this.language].right

    const hasBasicNavigationButtons = this.variant === '' || (isVariantDots && this.totalPages <= 5)

    const DotsWithText: FunctionalComponent = () => (
      <span class="dots">
        <strong>{this._value}</strong>
        <span>/</span>
        <span>{this.totalPages}</span>
      </span>
    )

    return (
      <Host
        class={{
          'is-sticky': this.sticky,
          'is-disabled': this.disabled,
          [`is-variant-${this.variant}`]: this.variant !== '',
          [`is-size-${this.size}`]: this.size !== '',
          [`is-align-${this.align}`]: this.align !== '',
        }}
      >
        <nav class={{}} id="nav" part="navigation" role="navigation" aria-label={labelControlTitle}>
          {!this.disabled && (
            <button
              id="previous"
              part="previous"
              aria-label={leftControlTitle}
              title={leftControlTitle}
              class={{
                'button': true,
                'is-square': true,
                'is-disabled': this._value < 2,
                'is-flat': flat,
                [buttonColor]: true,
                [buttonSize]: true,
              }}
              disabled={this._value < 2}
              onClick={() => this.previous()}
            >
              <ds-icon name="nav-go-left" size="sm" disabled={this._value < 2} />
            </button>
          )}
          {!this.disabled && (
            <button
              id="next"
              part="next"
              aria-label={rightControlTitle}
              title={rightControlTitle}
              class={{
                'button': true,
                'is-square': true,
                'is-disabled': this._value === this.totalPages,
                'is-flat': flat,
                [buttonColor]: true,
                [buttonSize]: true,
              }}
              disabled={this._value === this.totalPages}
              onClick={() => this.next()}
            >
              <ds-icon name="nav-go-right" size="sm" disabled={this._value === this.totalPages} />
            </button>
          )}
          {hasBasicNavigationButtons ? (
            <ul class={{ dots: this.variant === 'dots' }} part="list">
              {items}
            </ul>
          ) : (
            <DotsWithText></DotsWithText>
          )}
        </nav>
      </Host>
    )
  }
}
