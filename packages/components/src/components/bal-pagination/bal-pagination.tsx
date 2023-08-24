import {
  Component,
  Host,
  h,
  Prop,
  State,
  Watch,
  Method,
  Event,
  EventEmitter,
  Element,
  FunctionalComponent,
  ComponentInterface,
} from '@stencil/core'
import { BEM } from '../../utils/bem'
import { BalBreakpointObserver, BalBreakpoints, ListenToBreakpoints, balBreakpoints } from '../../utils/breakpoints'
import { BalConfigState } from '../../interfaces'
import { BalLanguage, ListenToConfig, defaultConfig } from '../../utils/config'
import { i18nControlLabel } from './bal-pagination.i18n'

@Component({
  tag: 'bal-pagination',
  styleUrls: {
    css: 'bal-pagination.sass',
  },
})
export class Pagination implements ComponentInterface, BalBreakpointObserver {
  @Element() el!: HTMLBalPaginationElement
  @State() _value = 1
  @State() isMobile = balBreakpoints.isMobile
  @State() language: BalLanguage = defaultConfig.language

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

  private getItems(pageRange = 1) {
    const items = []
    let rangeStart = this._value - pageRange
    let rangeEnd = this._value + pageRange

    if (this.interface === 'small') {
      rangeStart = 1
      rangeEnd = this.totalPages - 1
    } else {
      if (rangeEnd > this.totalPages) {
        rangeEnd = this.totalPages
        rangeStart = this.totalPages - pageRange * 2
        rangeStart = rangeStart < 1 ? 1 : rangeStart
      }

      if (rangeStart <= 1) {
        rangeStart = 1
        rangeEnd = Math.min(pageRange * 2 + 1, this.totalPages)
      }
    }

    if (rangeStart > 1) {
      items.push(this.renderPageElement(1))
      if (this.interface !== 'small') {
        items.push(this.renderEllipsisElement())
      }
    }

    for (let i = rangeStart; i <= rangeEnd; i++) {
      items.push(this.renderPageElement(i))
    }

    if (rangeEnd < this.totalPages) {
      if (this.interface !== 'small') {
        items.push(this.renderEllipsisElement())
      }
      items.push(this.renderPageElement(this.totalPages))
    }

    return items
  }

  renderEllipsisElement() {
    return (
      <li>
        <div class="pagination-more">
          <bal-text bold heading inline space="none">
            &hellip;
          </bal-text>
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
            class={{
              ...dot.class(),
              ...dot.modifier('active').class(isActive),
              ...dot.modifier('inactive').class(!isActive),
            }}
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
          onClick={() => this.selectPage(pageNumber)}
          data-testid="bal-pagination-page-number"
        >
          {pageNumber}
        </bal-button>
      </li>
    )
  }

  render() {
    const mobileItems = this.getItems()
    const tabletItems = this.getItems(this.pageRange)

    const block = BEM.block('pagination')
    const elNav = block.element('nav')
    const elPrevious = elNav.element('pagination-previous')
    const elNext = elNav.element('pagination-next')
    const elList = elNav.element('pagination-list')
    const isSmall = this.interface === 'small'
    const buttonColor = isSmall ? 'tertiary' : 'text'
    const buttonSize = isSmall ? 'small' : ''
    const flat = isSmall

    const leftControlTitle = i18nControlLabel[this.language].left
    const rightControlTitle = i18nControlLabel[this.language].right

    const hasBasicNavigationButtons = this.interface === '' || (isSmall && this.totalPages <= 5)

    const SmallWithText: FunctionalComponent = () => (
      <bal-text
        space="none"
        class={{
          ...elList.class(),
          ...elList.modifier(`context-${this.interface}`).class(),
        }}
        color="blue"
      >
        <span class="has-text-weight-bold">{this._value}</span>
        {' / ' + this.totalPages}
      </bal-text>
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
            ...elNav.modifier(`context-${this.interface}`).class(),
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
