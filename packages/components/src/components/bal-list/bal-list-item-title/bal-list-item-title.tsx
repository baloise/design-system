import { Component, Host, h, Prop } from '@stencil/core'
import { Props } from '../../../types'

@Component({
  tag: 'bal-list-item-title',
  scoped: false,
  shadow: false,
})
export class ListItemTitle {
  /**
   * Heading level with value 'h4' on default
   */
  @Prop() level: Props.BalHeadingLevel = 'h5'

  render() {
    return (
      <Host class="bal-list-item-title">
        <bal-heading level={this.level} space="none">
          <slot></slot>
        </bal-heading>
      </Host>
    )
  }
}
