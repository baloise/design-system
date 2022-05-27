import { Component, Host, h, Prop } from '@stencil/core'
import { BEM } from '../../utils/bem'

@Component({
  tag: 'bal-data',
})
export class Data {
  /**
   * If `true` a bottom border is added to the data-item.
   */
  @Prop() border = false

  /**
   * If `true` the data list is horizontal instead of vertical.
   */
  @Prop() horizontal = false

  render() {
    const block = BEM.block('data')

    return (
      <Host class={{ ...block.class(), 'has-border': this.border, 'is-horizontal': this.horizontal }}>
        <slot></slot>
      </Host>
    )
  }
}
