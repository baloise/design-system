import { Component, h, Host, Prop } from '@stencil/core'
import isEmpty from 'lodash.isempty'
import { Props } from '../../types'

@Component({
  tag: 'bal-card',
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
   * Defines the color of the card.
   */
  @Prop() color: Props.BalCardColor = 'white'

  get colorTypeClass(): string {
    return isEmpty(this.color) ? '' : `is-${this.inverted ? 'blue' : this.color}`
  }

  render() {
    return (
      <Host
        class={{
          'bal-card': true,
          [`bal-card--${this.colorTypeClass}`]: true,
          'bal-card--has-border': this.border,
          'bal-card--is-flat': this.flat,
          'bal-card--is-clickable': this.clickable,
          'bal-card--is-selected': this.selected,
          'bal-card--is-square': this.square,
          'bal-card--has-fullheight': this.fullheight,
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}
