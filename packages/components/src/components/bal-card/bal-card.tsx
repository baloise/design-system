import { Component, h, Host, Prop } from '@stencil/core'
import { isEmpty } from 'lodash'
import { ColorTypes } from '../../types/color.types'
import { PaddingCardType } from '../../types/padding.types'

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
   * If `true` a card will not have a shadow on mobile.
   */
  @Prop() flatMobile = false

  /**
   * If `true` the card loses its shadow.
   */
  @Prop() flat = false

  /**
   * If `true` the card loses its border radius.
   */
  @Prop() square = false

  /**
   * Defines the size of the padding grid
   */
  @Prop() padding: PaddingCardType = ''

  /**
   * @deprecated If `true` the card has padding.
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

  get paddingTypeClass(): string {
    return isEmpty(this.padding) ? '' : `has-${this.padding}-padding`
  }

  get colorTypeClass(): string {
    return isEmpty(this.color) ? '' : `is-${this.color}`
  }

  render() {
    if (this.padded) {
      console.warn('The attribute padded is deprecated. Please have a look at the new attribute padding')
    }

    return (
      <Host
        class={[
          'bal-card',
          this.colorTypeClass,
          this.paddingTypeClass,
          this.teaser ? 'is-teaser' : '',
          this.square ? 'is-square' : '',
          this.border ? 'has-border' : '',
          this.flat ? 'is-flat' : '',
          this.flatMobile ? 'is-flat-mobile' : '',
          this.inverted ? 'is-inverted' : '',
        ].join(' ')}
      >
        <slot></slot>
      </Host>
    )
  }
}
