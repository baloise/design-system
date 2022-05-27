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

  render() {
    const block = BEM.block('data-item')

    return (
      <Host class={{ ...block.class(), 'is-disabled': this.disabled }}>
        <slot></slot>
      </Host>
    )
  }
}
