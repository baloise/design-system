import { Component, Host, h, Prop } from '@stencil/core'
import { Props } from '../../../props'
import BalHeadingLevel = Props.BalHeadingLevel

@Component({
  tag: 'bal-list-item-title',
  scoped: false,
  shadow: false,
})
export class ListItemTitle {
  /**
   * Optional heading level with value 'h4' on default
   */
  @Prop() headingLevel?: BalHeadingLevel = 'h4'

  render() {
    return (
      <Host class="bal-list-item-title">
        <bal-heading level={this.headingLevel} space="none">
          <slot></slot>
        </bal-heading>
      </Host>
    )
  }
}
