import { Component, h, Host, Listen, Method, Prop, Element, Event, EventEmitter, State } from '@stencil/core'

@Component({
  tag: 'bal-dropdown',
  styleUrl: 'bal-dropdown.scss',
  shadow: false,
  scoped: false,
})
export class Dropdown {
  private dropdownId = `bal-dd-${DropdownIds++}`

  @Element() element!: HTMLElement

  @State() isDropDownContentUp = false

  /**
   * If `true` the field spans over the whole width.
   */
  @Prop() expanded: boolean = false
  @Prop() scrollable: number = 0

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
   * *Internal* - Use this to close unuesed dropdowns.
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
    if (!this.isActive) {
      this.balDropdownPrepare.emit(this.dropdownId)
      this.isActive = true
      this.balCollapse.emit(this.isActive)
    }
  }

  /**
   * Closes the dropdown menu.
   */
  @Method()
  async close() {
    if (this.isActive) {
      this.isActive = false
      this.balCollapse.emit(this.isActive)
    }
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
  async getMenuElement(): Promise<HTMLElement> {
    return this.menuElement
  }

  /**
   * Returns the `HTMLDivElement` of the content element
   */
  @Method()
  async getContentElement(): Promise<HTMLElement> {
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

  get menuElement(): HTMLElement {
    return this.element.querySelector('bal-dropdown-menu')
  }

  get contentElement(): HTMLElement {
    return this.element.querySelector('bal-dropdown-content')
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
          <slot></slot>
        </div>
      </Host>
    )
  }
}

let DropdownIds = 0
