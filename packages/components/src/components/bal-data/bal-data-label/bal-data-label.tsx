import { Component, Host, h, Prop } from '@stencil/core'
import { BEM } from '../../../utils/bem'

@Component({
  tag: 'bal-data-label',
})
export class DataLabel {
  /**
   * If `true` an asterix is added after the label.
   */
  @Prop() required = false

  render() {
    return (
      <Host class={{ ...BEM.block('data').element('data-label').class() }}>
        <slot></slot>
        {this.required ? '*' : ''}
      </Host>
    )
  }
}
