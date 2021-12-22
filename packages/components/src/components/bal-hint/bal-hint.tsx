import { Component, Host, h, Method, State, Prop, Element, Listen } from '@stencil/core'

@Component({
  tag: 'bal-hint',
})
export class Hint {
  @Element() element!: HTMLElement
  @State() isActive = false
  @State() placement: 'left' | 'right' = 'right'

  /**
   * Text for the close button.
   */
  @Prop() closeLabel = 'Close'

  /**
   * Disables the close button for tablet and desktop
   */
  @Prop() small = false

  @Listen('keyup', { target: 'document' })
  handleKeyUp(event: KeyboardEvent) {
    if (event.key === 'Escape' || event.key === 'Esc') {
      event.preventDefault()
      this.close()
    }
  }

  @Listen('click', { target: 'document' })
  clickOnOutside(event: UIEvent) {
    if (!this.element.contains(event.target as Node) && this.isActive) {
      this.toggle()
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

  private calcIsDropDownContentUp() {
    const box = this.element.getBoundingClientRect()
    const hint = this.element.querySelector('.bal-hint-content')
    const width = hint?.clientWidth === 0 ? 464 : hint?.clientWidth || 0
    this.placement = window.innerWidth < box.right + width ? 'left' : 'right'
  }

  /**
   * Toggles the hint box.
   */
  @Method()
  async toggle(): Promise<void> {
    this.calcIsDropDownContentUp()
    this.isActive = !this.isActive
  }

  /**
   * Opens the hint box.
   */
  @Method()
  async open(): Promise<void> {
    this.isActive = true
  }

  /**
   * Closes the hint box.
   */
  @Method()
  async close(): Promise<void> {
    this.isActive = false
  }

  render() {
    return (
      <Host
        class={{
          [`is-placed-${this.placement}`]: true,
          'is-small': this.small,
        }}
        data-visible={this.isActive}
      >
        <bal-icon
          class="data-test-hint-trigger"
          role="button"
          name="info-circle"
          size=""
          onClick={() => this.toggle()}
        ></bal-icon>

        <div
          class="bal-hint-content data-test-hint-content p-4"
          style={{ display: this.isActive ? 'inline-block' : 'none' }}
        >
          <slot></slot>

          <div class="buttons is-row-reverse">
            <bal-button class="data-test-hint-close" color="info" outlined inverted onClick={() => this.close()}>
              {this.closeLabel}
            </bal-button>
          </div>
        </div>
      </Host>
    )
  }
}
