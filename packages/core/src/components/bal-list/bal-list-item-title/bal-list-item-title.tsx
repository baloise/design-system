import { Component, h, Host, Prop } from '@stencil/core'
import { HEADING_SIZES, HEADING_TAGS, HeadingSize, HeadingTag } from '../../bal-heading/bal-heading.const'

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
  @Prop() visualLevel?: BalProps.BalHeadingVisualLevel

  private get fontSize(): HeadingSize {
    return HEADING_SIZES[this.visualLevel ? this.visualLevel : this.level]
  }

  private get tag(): HeadingTag {
    return HEADING_TAGS[this.level]
  }

  render() {
    const Heading = this.tag

    return (
      <Host class="bal-list__item__title">
        <Heading
          class={{
            'title': true,
            'has-space-none': true,
            [`is-${this.fontSize}`]: this.fontSize !== undefined,
          }}
        >
          <slot></slot>
        </Heading>
      </Host>
    )
  }
}
