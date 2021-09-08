import { Component, Host, h, Prop, Method, Event, EventEmitter } from '@stencil/core'
import { ColorTypesBasic } from '../../types/color.types'
import { BalButtonColor } from '../bal-button/bal.button.type'

@Component({
  tag: 'bal-accordion',
  styleUrl: 'bal-accordion.scss',
  scoped: true,
  shadow: false,
})
export class Accordion {
  /**
   * Type defines the theme of the accordion toggle
   */
  @Prop() color: ColorTypesBasic = 'primary'

  /**
   * Controls if the accordion is collapsed or not
   */
  @Prop({ mutable: true, reflect: true }) isActive = false

  /**
   * Label of the open trigger button
   */
  @Prop() openLabel = ''

  /**
   * Bal-Icon of the open trigger button
   */
  @Prop() openIcon = 'plus'

  /**
   * Label of the close trigger button
   */
  @Prop() closeLabel = ''

  /**
   * Bal-Icon of the close trigger button
   */
  @Prop() closeIcon = 'minus'

  /**
   * If `true` the accordion is used on the bottom of a card
   */
  @Prop() card = false

  /**
   * Emmited when the accordion has changed
   */
  @Event() balCollapse!: EventEmitter<boolean>

  /**
   * Open the accordion
   */
  @Method()
  async open() {
    this.isActive = true
    this.balCollapse.emit(this.isActive)
  }

  /**
   * Close the accordion
   */
  @Method()
  async close() {
    this.isActive = false
    this.balCollapse.emit(this.isActive)
  }

  /**
   * Triggers the accordion
   */
  @Method()
  async toggle() {
    this.isActive = !this.isActive
    this.balCollapse.emit(this.isActive)
  }

  get buttonType(): BalButtonColor {
    return `${this.color}-light` as BalButtonColor
  }

  get label() {
    return this.isActive ? this.closeLabel : this.openLabel
  }

  get icon() {
    return this.isActive ? this.closeIcon : this.openIcon
  }

  render() {
    return (
      <Host class="accordion">
        <bal-button
          class="data-test-accordion-trigger"
          expanded={true}
          color={this.buttonType}
          icon={this.icon}
          onClick={() => this.toggle()}
          top-rounded={!this.card}
          bottomRounded={!this.isActive}
        >
          {this.label}
        </bal-button>
        <div class={['accordion-content', `is-${this.color}`].join(' ')} style={{ display: this.isActive ? 'block' : 'none' }}>
          <slot></slot>
        </div>
      </Host>
    )
  }
}
