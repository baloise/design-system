import { Component, h, Host, Listen, Method, Prop, Element, Event, EventEmitter, State } from '@stencil/core'

@Component({
  tag: 'bal-dropdown',
  styleUrl: 'bal-dropdown.scss',
  shadow: false,
  scoped: true,
})
export class Dropdown {
  private dropdownId = `bal-dd-${DropdownIds++}`

  contentElement!: HTMLDivElement
  menuElement!: HTMLDivElement

  @Element() element!: HTMLElement

  @State() isDropDownContentUp = false

  /**
   * Limit the height of the dropdown content. Pass the amount of pixel.
   */
  @Prop() scrollable: number = 0

  /**
   * If `true` the field spans over the whole width.
   */
  @Prop() expanded: boolean = false

  /**
   * If `true` the dropdown content has a fixed width
   */
  @Prop() fixedContentWidth: boolean = false

  /**
   * If `true` the dropdown content is open.
   */
  @Prop({ mutable: true, reflect: true }) isActive = false

  /**
   * Listen when the dropdown opens or closes. Returns the current `isActive` value.
   */
  @Event({ eventName: 'balCollapse' }) balCollapse!: EventEmitter<boolean>

  /**
   * Internal
   */
  @Event({ eventName: 'balDropdownPrepare' }) balDropdownPrepare!: EventEmitter<string>

  @Listen('balDropdownPrepare', { target: 'body' })
  handleDropdownPrepare(dropdownId: string) {
    if (this.dropdownId !== dropdownId) {
      this.close()
    }
  }

  @Listen('keydown', { target: 'window' })
  handleKeyUp(event: KeyboardEvent) {
    if (this.isActive && (event.key === 'Escape' || event.key === 'Esc')) {
      event.preventDefault()
      this.close()
    }
  }

  /**
   * Open the dropdown menu.
   */
  @Method()
  async open() {
    this.balDropdownPrepare.emit(this.dropdownId)
    this.isActive = true
    this.balCollapse.emit(this.isActive)
  }

  /**
   * Closes the dropdown menu.
   */
  @Method()
  async close() {
    this.isActive = false
    this.balCollapse.emit(this.isActive)
  }

  /**
   * Open or closes the dropdown.
   */
  @Method()
  async toggle() {
    this.isActive = !this.isActive
    this.balCollapse.emit(this.isActive)
  }

  /**
   * Returns the `HTMLDivElement` of the menu element
   */
  @Method()
  async getMenuElement(): Promise<HTMLDivElement> {
    return this.menuElement
  }

  /**
   * Returns the `HTMLDivElement` of the content element
   */
  @Method()
  async getContentElement(): Promise<HTMLDivElement> {
    return this.contentElement
  }

  @Listen('keyup', { target: 'document' })
  async tabOutside(event: KeyboardEvent) {
    if (event.key === 'Tab' && !this.element.contains(document.activeElement) && this.isActive) {
      await this.toggle()
    }
  }

  @Listen('click', { target: 'document' })
  async clickOnOutside(event: UIEvent) {
    if (!this.element.contains(event.target as any) && this.isActive) {
      await this.toggle()
      this.calcIsDropDownContentUp()
    }
  }

  @Listen('resize', { target: 'window' })
  async resizeHandler() {
    this.calcIsDropDownContentUp()
  }

  @Listen('scroll', { target: 'window' })
  async scrollHandler() {
    this.calcIsDropDownContentUp()
  }

  get contentStyle() {
    if (this.scrollable === 0) {
      return {}
    } else {
      const maxHeight = `${this.scrollable}px`
      return {
        'max-height': maxHeight,
        'overflow': 'auto',
      }
    }
  }

  private calcIsDropDownContentUp() {
    const box = this.element.getBoundingClientRect()
    const clientHeight = this.contentElement?.clientHeight || 250
    this.isDropDownContentUp = window.innerHeight < box.bottom + clientHeight + 50
  }

  componentWillRender() {
    this.calcIsDropDownContentUp()
  }

  render() {
    return (
      <Host data-id={this.dropdownId}>
        <div
          class={{
            'dropdown': true,
            'is-active': this.isActive,
            'has-fixed-content-width': this.fixedContentWidth,
            'is-expanded': this.expanded,
            'is-up': this.isDropDownContentUp,
          }}>
          <div class="dropdown-trigger">
            <slot name="trigger" />
          </div>
          <div
            class="dropdown-menu"
            id="dropdown-menu"
            role="menu"
            ref={el => (this.menuElement = el as HTMLDivElement)}>
            <div
              class="dropdown-content"
              style={this.contentStyle}
              ref={el => (this.contentElement = el as HTMLDivElement)}>
              <slot></slot>
            </div>
          </div>
        </div>
      </Host>
    )
  }
}

let DropdownIds = 0
