import { Component, Host, h, Prop, Method, Event, EventEmitter } from '@stencil/core'

@Component({
  tag: 'bal-accordion',
  styleUrl: 'bal-accordion.scss',
  scoped: false,
  shadow: false,
})
export class Accordion {
  /**
   * Controls if the accordion is collapsed or not
   */
  @Prop({ mutable: true, reflect: true }) isActive = false

  /**
   * Label of the open trigger button
   */
  @Prop() openLabel = ''

  /**
   * If `true` the component is ready for a dark background
   */
  @Prop() inverted: boolean = false

  /**
   * Label of the open trigger button
   */
  @Prop() interface: '' | 'light' = ''

  /**
   * Label of the close trigger button
   */
  @Prop() closeLabel = ''

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

  get label() {
    return this.isActive ? this.closeLabel : this.openLabel
  }

  render() {
    return (
      <Host
        class={{
          'accordion': true,
          'is-active': this.isActive,
          'is-inverted': this.inverted,
          [`is-interface-${this.interface}`]: this.interface.length > 0,
        }}
      >
        <bal-button color="" class="data-test-accordion-trigger" expanded={true} onClick={() => this.toggle()} bottomRounded={!this.isActive}>
          <bal-icon slot={this.interface === 'light' ? 'icon-right' : 'icon-left'} name={this.isActive ? 'minus' : 'plus'}></bal-icon>
          {this.label}
        </bal-button>
        <div
          class={{
            'accordion-content': true,
          }}
          style={{ display: this.isActive ? 'block' : 'none' }}
        >
          <slot></slot>
        </div>
      </Host>
    )
  }
}
