import { Component, h, Host, Prop } from '@stencil/core'
import isEmpty from 'lodash/isEmpty'

@Component({
  tag: 'bal-card',
  styleUrl: 'bal-card.host.scss',
  shadow: false,
})
export class Card {
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
   * If `true` the card background color becomes blue.
   */
  @Prop() inverted = false

  /**
   * If `true` the card has a hover effect.
   */
  @Prop() clickable = false

  /**
   * If `true` the card gets a light background to indicate a selection.
   */
  @Prop() selected = false

  /**
   * If `true` the card uses 100% of the available height.
   */
  @Prop() fullheight = false

  /**
   * Defines the space of the card content.
   */
  @Prop() space: BalProps.BalCardSpace = ''

  /**
   * Defines the color of the card.
   */
  @Prop() color: BalProps.BalCardColor = 'white'

  get colorTypeClass(): string {
    const color = isEmpty(this.color) ? '' : `${this.inverted ? 'primary' : this.color}`

    const colorMap: Record<string, string> = {
      'blue': 'primary',
      'purple-1': 'purple-lighter',
      'purple-2': 'purple-light',
      'purple-3': 'purple',
      'red-1': 'red-lighter',
      'red-2': 'red-light',
      'red-3': 'red',
      'green-1': 'green-lighter',
      'green-2': 'green-light',
      'green-3': 'green',
      'yellow-1': 'yellow-lighter',
      'yellow-2': 'yellow-light',
      'yellow-3': 'yellow',
    }

    return colorMap[color] || color
  }

  render() {
    return (
      <Host
        class={{
          card: true,
          [`is-${this.colorTypeClass}`]: !isEmpty(this.color) && this.colorTypeClass !== 'white',
          [`has-space-${this.space}`]: !isEmpty(this.space),
          [`is-fullheight`]: this.fullheight,
          [`is-square`]: this.square,
          [`is-outlined`]: this.border,
          [`is-flat`]: this.border || this.flat,
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}
