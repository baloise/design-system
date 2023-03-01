import { Component, Host, h, Prop } from '@stencil/core'

@Component({
  tag: 'bal-list-item-title',
  scoped: false,
  shadow: false,
})
export class ListItemTitle {
  /**
   * Heading level with value 'h4' on default
   */
  @Prop() level: BalProps.BalHeadingLevel = 'h5'

  /**
   * Make the visual style mimic a specific heading level.
   * This option allows you to make e.g. h1 visually look like h3,
   * but still keep it h1 in the markup.
   */
  @Prop() visualLevel?: BalProps.BalHeadingLevel

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
