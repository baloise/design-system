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
  type LogInstance,
  checkEmptyOrType,
  checkEmptyOrOneOf,
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
   * Disables component
   */
  @Prop({ reflect: true }) readonly disabled: boolean = false

  /**
   * The label for the navigation landmark
   */
  @Prop() readonly label: string = ''

  /**
   * Specify the max visible pages before and after the selected page
   */
  @Prop() readonly pageRange: number = 2

  /**
   * Size of the buttons
   */
  @Prop() readonly size: DS.PaginationSize = ''

  /**
   * If 'true, the pagination will be sticky to the top
   */
  @Prop() readonly sticky: boolean = false

  /**
   * The label for the next page button
   */
  @Prop() readonly textNext: string = ''

  /**
   * The label for the previous page button
   */
  @Prop() readonly textPrevious: string = ''

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
   * The total amount of pages
   */
  @Prop() readonly totalPages: number = 1

  /**
   * Current selected page
   */
  @Prop({ reflect: true, mutable: true }) value = 1

  /**
   * Defines the layout of the pagination
   */
  @Prop() readonly variant: DS.PaginationVariant = ''

  /**
   * Triggers when a page change happens
   */
  @Event({ eventName: 'dsChange' }) dsChangeEventEmitter!: EventEmitter<DS.PaginationChangeDetail>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback(): void {
    this.validateProps()
  }

  componentWillLoad() {
    this.topValueChanged(this.top)
  }

  componentWillUpdate() {
    this.validateProps()
  }

  /**
   * PROPERTY VALIDATION
   * ------------------------------------------------------
   */

  private validateProps() {
    checkEmptyOrType(this, 'label', 'string')
    checkEmptyOrOneOf(this, 'align', ['', 'start', 'end'])
    checkEmptyOrOneOf(this, 'size', ['', 'sm'])
    checkEmptyOrOneOf(this, 'variant', ['', 'dots'])
    checkEmptyOrType(this, 'textNext', 'string')
    checkEmptyOrType(this, 'textPrevious', 'string')
  }

  /**
   * PUBLIC LISTENERS
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
   * Go to the next page
   */
  @Method()
  async next() {
    if (this.value < this.totalPages) {
      this.value = this.value + 1
      this.dsChangeEventEmitter.emit(this.value)
    }
  }

  /**
   * Go to the previous page
   */
  @Method()
  async previous() {
    if (this.value !== 1) {
      this.value = this.value - 1
      this.dsChangeEventEmitter.emit(this.value)
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
    this.value = pageNumber
    this.dsChangeEventEmitter.emit(this.value)
  }

  private getItems(pageRange = 2) {
    const controls = generatePaginationControl(this.value, this.totalPages, pageRange)
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
    const isActive = this.value === pageNumber

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
        <strong>{this.value}</strong>
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
                'is-disabled': this.value < 2,
                'is-flat': flat,
                [buttonColor]: true,
                [buttonSize]: true,
              }}
              disabled={this.value < 2}
              onClick={() => this.previous()}
            >
              <ds-icon name="nav-go-left" size="sm" disabled={this.value < 2} />
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
                'is-disabled': this.value === this.totalPages,
                'is-flat': flat,
                [buttonColor]: true,
                [buttonSize]: true,
              }}
              disabled={this.value === this.totalPages}
              onClick={() => this.next()}
            >
              <ds-icon name="nav-go-right" size="sm" disabled={this.value === this.totalPages} />
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
