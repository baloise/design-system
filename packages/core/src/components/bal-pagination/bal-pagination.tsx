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
import { BEM } from '../../utils/bem'
import { BalBreakpointObserver, BalBreakpoints, ListenToBreakpoints, balBreakpoints } from '../../utils/breakpoints'
import { BalConfigState, BalLanguage, ListenToConfig, defaultConfig } from '../../utils/config'
import { i18nControlLabel } from './bal-pagination.i18n'
import { generatePaginationControl } from './bal-pagination.util'

@Component({
  tag: 'bal-pagination',
  styleUrl: 'bal-pagination.sass',
})
export class Pagination implements ComponentInterface, BalBreakpointObserver {
  @Element() el!: HTMLBalPaginationElement
  @State() _value = 1
  @State() isMobile = balBreakpoints.isMobile
  @State() language: BalLanguage = defaultConfig.language

  /**
   * Align the buttons to start, center or end
   */
  @Prop() align: BalProps.BalPaginationAlignment = ''

  /**
   * Size of the buttons
   */
  @Prop() size: BalProps.BalPaginationSize = ''

  /**
   * Defines the layout of the pagination
   */
  @Prop() interface: BalProps.BalPaginationInterface = ''

  /**
   * Disables component
   */
  @Prop() disabled = false

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
  @Prop() totalPages = 1

  /**
   * Specify the max visible pages before and after the selected page
   */
  @Prop() pageRange = 2

  /**
   * If 'true, the pagination will be sticky to the top
   */
  @Prop() sticky = false

  /**
   * If sticky, the top position will be determined by this value
   */
  @Prop() top = 0

  @Watch('top')
  topValueChanged(newValue: number) {
    if (this.sticky) {
      this.el.style.top = `${newValue}px`
    }
  }

  /**
   * Triggers when a page change happens
   */
  @Event({ eventName: 'balChange' }) balChangeEventEmitter!: EventEmitter<BalEvents.BalPaginationChangeDetail>

  componentWillLoad() {
    this._value = this.value
    this.topValueChanged(this.top)
  }

  @ListenToBreakpoints()
  breakpointListener(breakpoints: BalBreakpoints): void {
    this.isMobile = breakpoints.mobile
  }

  /**
   * Go to the next page
   */
  @Method()
  async next() {
    if (this._value < this.totalPages) {
      this._value = this._value + 1
      this.balChangeEventEmitter.emit(this._value)
    }
  }

  /**
   * Go to the previous page
   */
  @Method()
  async previous() {
    if (this._value !== 1) {
      this._value = this._value - 1
      this.balChangeEventEmitter.emit(this._value)
    }
  }

  /**
   * @internal define config for the component
   */
  @Method()
  @ListenToConfig()
  async configChanged(state: BalConfigState): Promise<void> {
    this.language = state.language
  }

  selectPage(pageNumber: number) {
    this._value = pageNumber
    this.balChangeEventEmitter.emit(this._value)
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

  renderEllipsisElement() {
    const more = BEM.block('pagination').element('nav').element('pagination-list').modifier('more')

    return (
      <li aria-hidden={'true'}>
        <div
          class={{
            ...more.class(),
          }}
        >
          <span>&hellip;</span>
        </div>
      </li>
    )
  }

  renderPageElement(pageNumber: number) {
    const isActive = this._value === pageNumber
    const dot = BEM.block('pagination').element('nav').element('pagination-list').element('dot')

    if (this.interface === 'small') {
      return (
        <li>
          <span
            role="button"
            aria-current={isActive ? 'true' : undefined}
            class={{
              ...dot.class(),
              ...dot.modifier('active').class(isActive),
              ...dot.modifier('inactive').class(!isActive),
            }}
            aria-label={pageNumber}
            onClick={() => this.selectPage(pageNumber)}
          />
        </li>
      )
    }
    return (
      <li>
        <bal-button
          square
          color={isActive ? 'primary' : 'text'}
          aria-current={isActive ? 'true' : undefined}
          onClick={() => this.selectPage(pageNumber)}
          data-testid="bal-pagination-page-number"
          size={this.isMobile || this.size === 'small' ? 'small' : ''}
        >
          {pageNumber}
        </bal-button>
      </li>
    )
  }

  render() {
    const mobileItems = this.getItems(1)
    const tabletItems = this.getItems(this.pageRange)

    const block = BEM.block('pagination')
    const elNav = block.element('nav')
    const elPrevious = elNav.element('pagination-previous')
    const elNext = elNav.element('pagination-next')
    const elList = elNav.element('pagination-list')
    const isSmall = this.interface === 'small'
    const buttonColor = isSmall ? 'link' : 'text'
    const buttonSize = isSmall || this.size === 'small' || this.isMobile ? 'small' : ''
    const flat = isSmall

    const leftControlTitle = i18nControlLabel[this.language].left
    const rightControlTitle = i18nControlLabel[this.language].right

    const hasBasicNavigationButtons = this.interface === '' || (isSmall && this.totalPages <= 5)

    const SmallWithText: FunctionalComponent = () => (
      <span
        class={{
          ...elList.class(),
          ...elList.modifier(`context-${this.interface}`).class(),
        }}
      >
        <span>{this._value}</span>
        {' / ' + this.totalPages}
      </span>
    )

    const PaginationTablet: FunctionalComponent = () => (
      <ul
        class={{
          ...elList.class(),
          ...elList.modifier(`context-${this.interface}`).class(),
          'is-disabled': this.disabled,
        }}
        data-testid="bal-pagination-list"
      >
        {tabletItems}
      </ul>
    )

    const PaginationMobile: FunctionalComponent = () => (
      <ul
        class={{
          ...elList.class(),
          ...elList.modifier(`context-${this.interface}`).class(),
          'is-disabled': this.disabled,
        }}
        data-testid="bal-pagination-list"
      >
        {mobileItems}
      </ul>
    )

    return (
      <Host
        class={{
          ...block.class(),
          ...block.modifier('is-sticky').class(this.sticky),
        }}
      >
        <nav
          class={{
            ...elNav.class(),
            ...elNav.modifier(`context-${this.interface}`).class(this.interface !== ''),
            ...elNav.modifier(`align-${this.align}`).class(this.align !== ''),
          }}
          role="navigation"
          aria-label="pagination"
        >
          <bal-button
            square
            color={buttonColor}
            size={buttonSize}
            flat={flat}
            class={{
              ...elPrevious.class(),
              ...elPrevious.modifier(`context-${this.interface}`).class(),
            }}
            disabled={this._value < 2 || this.disabled}
            onClick={() => this.previous()}
            data-testid="bal-pagination-controls-left"
            title={leftControlTitle}
          >
            <bal-icon name="nav-go-left" size="small" />
          </bal-button>
          <bal-button
            square
            color={buttonColor}
            size={buttonSize}
            flat={flat}
            class={{
              ...elNext.class(),
              ...elNext.modifier(`context-${this.interface}`).class(),
            }}
            disabled={this._value === this.totalPages || this.disabled}
            onClick={() => this.next()}
            data-testid="bal-pagination-controls-right"
            title={rightControlTitle}
          >
            <bal-icon name="nav-go-right" size="small" />
          </bal-button>
          {hasBasicNavigationButtons && this.isMobile ? <PaginationMobile></PaginationMobile> : ''}
          {hasBasicNavigationButtons && !this.isMobile ? <PaginationTablet></PaginationTablet> : ''}
          {!hasBasicNavigationButtons ? <SmallWithText></SmallWithText> : ''}
        </nav>
      </Host>
    )
  }
}
