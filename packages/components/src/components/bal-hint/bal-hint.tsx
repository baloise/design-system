import { Component, Host, h, Method, State, Prop, Element, Listen } from '@stencil/core'
import { attachComponentToConfig, BalConfigObserver, BalConfigState, detachComponentToConfig } from '../../config'
import { Props } from '../../props'
import { BEM } from '../../utils/bem'

@Component({
  tag: 'bal-hint',
})
export class Hint implements BalConfigObserver {
  @Element() element!: HTMLElement
  @State() innerCloseLabel = 'Close'
  @State() isActive = false
  @State() placement: Props.BalHintPlacement = 'right'

  /**
   * Text for the close button.
   */
  @Prop() closeLabel?: string

  /**
   * Disables the close button for tablet and desktop
   */
  @Prop() small = false

  @Listen('keyup', { target: 'document' })
  handleKeyUp(event: KeyboardEvent) {
    if (event.key === 'Escape' || event.key === 'Esc') {
      event.preventDefault()
      this.dismiss()
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

  connectedCallback() {
    attachComponentToConfig(this)
  }

  disconnectedCallback() {
    detachComponentToConfig(this)
  }

  configChanged(state: BalConfigState): void {
    if (!this.closeLabel) {
      switch (state.language) {
        case 'de':
          this.innerCloseLabel = 'Schliessen'
          break
        case 'fr':
          this.innerCloseLabel = 'Fermer'
          break
        case 'it':
          this.innerCloseLabel = 'Chiudere'
          break
        case 'nl':
          this.innerCloseLabel = 'Dichtbij'
          break
        default:
          this.innerCloseLabel = 'Close'
          break
      }
    }
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
  async present(): Promise<void> {
    this.isActive = true
  }

  /**
   * Closes the hint box.
   */
  @Method()
  async dismiss(): Promise<void> {
    this.isActive = false
  }

  render() {
    const block = BEM.block('hint')
    const hasSize = this.small
    const sizeClass = 'is-small'
    const hasPlacement = true
    const placementClass = `is-placed-${this.placement}`
    const elLabel = block.element('content')
    const elIcon = block.element('icon')
    const elButtons = elLabel.element('buttons')
    const rowReverseClass = 'is-row-reverse'
    const hasRowReverse = true
    const hiddenDesktopClass = 'is-hidden-desktop'
    const hasHiddenDesktop = this.small

    return (
      <Host
        class={{
          ...block.class(),
          ...block.modifier(placementClass).class(hasPlacement),
          ...block.modifier(sizeClass).class(hasSize),
        }}
        data-visible={this.isActive}
      >
        <bal-icon
          class={{
            ...elIcon.class(),
            'data-test-hint-trigger': true,
          }}
          role="button"
          name="info-circle"
          size="small"
          onClick={() => this.toggle()}
        ></bal-icon>

        <div
          class={{
            ...elLabel.class(),
            ...elLabel.modifier(placementClass).class(hasPlacement),
            'data-test-hint-content': true,
            'p-5': true,
          }}
          style={{ display: this.isActive ? 'flex' : 'none' }}
        >
          <slot></slot>
          <bal-button-group
            class={{
              ...elButtons.class(),
              ...elButtons.modifier(rowReverseClass).class(hasRowReverse),
              ...elButtons.modifier(hiddenDesktopClass).class(hasHiddenDesktop),
            }}
          >
            <bal-button class="data-test-hint-close" color="info" onClick={() => this.dismiss()}>
              {this.closeLabel ? this.closeLabel : this.innerCloseLabel}
            </bal-button>
          </bal-button-group>
        </div>
      </Host>
    )
  }
}
