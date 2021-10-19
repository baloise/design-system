import { Component, Host, h, Prop, State, Watch, Method, Event, EventEmitter } from '@stencil/core'

@Component({
  tag: 'bal-pagination',
  styleUrl: 'bal-pagination.scss',
  scoped: true,
  shadow: false,
})
export class Pagination {
  @State() _value = 1

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
   * Triggers when a page change happens
   */
  @Event({ eventName: 'balChange' }) balChangeEventEmitter!: EventEmitter<number>

  componentWillLoad() {
    this._value = this.value
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
   * Go to the prvious page
   */
  @Method()
  async previous() {
    if (this._value !== 1) {
      this._value = this._value - 1
      this.balChangeEventEmitter.emit(this._value)
    }
  }

  selectPage(pageNumber: number) {
    this._value = pageNumber
    this.balChangeEventEmitter.emit(this._value)
  }

  renderEllipsisElement() {
    return (
      <li>
        <span class="pagination-ellipsis">&hellip;</span>
      </li>
    )
  }

  renderPageElement(pageNumber: number) {
    return (
      <li>
        <a class={['pagination-link', this._value === pageNumber ? 'is-current' : ''].join(' ')} onClick={() => this.selectPage(pageNumber)}>
          <span>{pageNumber}</span>
        </a>
      </li>
    )
  }

  private getItems(pageRange: number = 1) {
    const items = []
    let rangeStart = this._value - pageRange
    let rangeEnd = this._value + pageRange

    if (rangeEnd > this.totalPages) {
      rangeEnd = this.totalPages
      rangeStart = this.totalPages - pageRange * 2
      rangeStart = rangeStart < 1 ? 1 : rangeStart
    }

    if (rangeStart <= 1) {
      rangeStart = 1
      rangeEnd = Math.min(pageRange * 2 + 1, this.totalPages)
    }

    if (rangeStart > 1) {
      items.push(this.renderPageElement(1))
      items.push(this.renderEllipsisElement())
    }

    for (let i = rangeStart; i <= rangeEnd; i++) {
      items.push(this.renderPageElement(i))
    }

    if (rangeEnd < this.totalPages) {
      items.push(this.renderEllipsisElement())
      items.push(this.renderPageElement(this.totalPages))
    }

    return items
  }

  render() {
    const mobileItems = this.getItems()
    const tabletItems = this.getItems(this.pageRange)

    return (
      <Host>
        <nav class="pagination is-centered" role="navigation" aria-label="pagination">
          <button type="button" class="pagination-previous" disabled={this._value < 2} onClick={() => this.previous()}>
            <bal-icon name="nav-go-left" color={this._value < 2 ? 'gray' : 'primary'} />
          </button>
          <button type="button" class="pagination-next" disabled={this._value === this.totalPages} onClick={() => this.next()}>
            <bal-icon name="nav-go-right" color={this._value === this.totalPages ? 'gray' : 'primary'} />
          </button>
          <ul class="pagination-list is-hidden-mobile">{tabletItems}</ul>
          <ul class="pagination-list is-hidden-tablet">{mobileItems}</ul>
        </nav>
      </Host>
    )
  }
}
