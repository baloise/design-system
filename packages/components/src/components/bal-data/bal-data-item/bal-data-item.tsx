import { Component, Host, h, Prop } from '@stencil/core'
import { BEM } from '../../../utils/bem'

@Component({
  tag: 'bal-data-item',
})
export class DataItem {
  /**
   * If `true` the item gets a lighter font color.
   */
  @Prop() disabled = false

  /**
   * If `true` a bottom border is added to the data-item.
   */
  @Prop() border = false

  render() {
    const element = BEM.block('data').element('data-item')

    return (
      <Host
        class={{
          ...element.class(),
          ...element.modifier('is-disabled').class(this.disabled),
          ...element.modifier('has-border').class(this.border),
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}
