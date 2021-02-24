import { Component, h, Host, Prop } from '@stencil/core'
import { ColorTypes } from '../../types/color.types'

@Component({
  tag: 'bal-card',
  shadow: false,
  scoped: false,
})
export class BalCard {
  /**
   * If `true` a light blue border is added to the card.
   */
  @Prop() border = false

  /**
   * If `true` the card loses its shadow.
   */
  @Prop() flat = false

  /**
   * If `true` the card loses its border radius.
   */
  @Prop() square = false

  /**
   * If `true` the card has padding.
   */
  @Prop() padded = false

  /**
   * If `true` the card background color becomes blue.
   */
  @Prop() inverted = false

  /**
   * Defines the color of the card.
   */
  @Prop() color: ColorTypes | '' = ''

  /**
   * If `true` the card has a limited width on desktop.
   */
  @Prop() teaser = false

  render() {
    return (
      <Host
        class={[
          'bal-card',
          `is-${this.color}`,
          this.teaser ? 'is-teaser' : '',
          this.square ? 'is-square' : '',
          this.padded ? 'is-padded' : '',
          this.border ? 'has-border' : '',
          this.flat ? 'is-flat' : '',
          this.inverted ? 'is-inverted' : '',
        ].join(' ')}>
        <slot></slot>
      </Host>
    )
  }
}
