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
   * Defines the color of the card.
   */
  @Prop() color: Props.BalCardColor = ''

  get colorTypeClass(): string {
    return isEmpty(this.color) ? '' : `is-${this.color}`
  }

  render() {
    return (
      <Host
        class={{
          'bal-card': true,
          [`${this.colorTypeClass}`]: true,
          'has-border': this.border,
          'is-inverted': this.inverted,
          'has-shadow': !this.flat,
          'is-clickable': this.clickable,
          'is-selected': this.selected,
          'has-radius-large': !this.square,
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}
