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

  /**
   * Make the visual style mimic a specific heading level.
   * This option allows you to make e.g. h1 visually look like h3,
   * but still keep it h1 in the markup.
   */
  @Prop() visualLevel?: Props.BalHeadingLevel

  render() {
    return (
      <Host class="bal-list__item__title">
        <bal-heading level={this.level} visualLevel={this.visualLevel} space="none">
          <slot></slot>
        </bal-heading>
      </Host>
    )
  }
}
