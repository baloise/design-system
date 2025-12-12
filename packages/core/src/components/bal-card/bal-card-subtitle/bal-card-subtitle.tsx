import { Component, h, Host, Prop } from '@stencil/core'
import { BEM } from 'packages/core/src/utils/bem'
@Component({
  tag: 'bal-card-subtitle',
})
export class CardSubtitle {
  /**
   * If `true` the card text color becomes white.
   */
  @Prop() inverted = false

  /**
   * If `true` the card text color is bold.
   */
  @Prop() bold = false

  /**
   * If `true` the card text color becomes white.
   */
  @Prop() color: BalProps.BalHeadingColor = ''

  render() {
    const block = BEM.block('card-subtitle')

    return (
      <Host
        class={{
          'card-header': true,
          // ...block.class(),
          // ...block.modifier('bold').class(this.bold),
          // ...block.modifier(`color-${this.color}`).class(!this.inverted),
          // ...block.modifier('inverted').class(this.inverted),
        }}
      >
        <span
          class={{
            'text': true,
            'is-bold': this.bold,
            [`is-${this.color}`]: this.color !== '' && !this.inverted,
            'is-inverted': this.inverted,
          }}
        >
          <slot></slot>
        </span>
      </Host>
    )
  }
}
