import { Component, h, Host, Element, Prop } from '@stencil/core'
import { Props } from '../../../props'
import { BEM } from '../../../utils/bem'

@Component({
  tag: 'bal-popover-content',
})
export class PopoverContent {
  @Element() el!: HTMLElement

  /**
   * If `true` the popover has no padding space.
   */
  @Prop() spaceless = false

  /**
   * Limit the height of the popover content. Pass the amount of pixel.
   */
  @Prop() scrollable = 0

  /**
   * Define the max width of the popover content.
   */
  @Prop() contentWidth = 0

  /**
   * Define the min width of the popover content.
   */
  @Prop() contentMinWidth = 0

  /**
   * Defines background color of the content.
   */
  @Prop() color: Props.BalPopoverContentColor = 'white'

  /**
   * If `true` the content has a min width of 100%.
   */
  @Prop() expanded = false

  /**
   * Defines border-radius of popover content.
   */
  @Prop() radius: Props.BalPopoverContentRadius = 'normal'

  /**
   * If `true` the popover does not have the shadow
   */
  @Prop() noShadow = false

  get innerStyle() {
    let scrollable = {}

    if (this.scrollable > 0) {
      scrollable = {
        'max-height': `${this.scrollable}px`,
        'overflow': 'auto',
      }
    }

    return {
      ...scrollable,
    }
  }

  get contentStyle() {
    let contentWidth = {}
    let contentMinWidth = {}

    if (this.contentWidth > 0) {
      contentWidth = { 'max-width': `${this.contentWidth}px` }
    }

    if (this.contentMinWidth > 0) {
      contentMinWidth = { 'min-width': `${this.contentMinWidth}px` }
    }

    return {
      ...contentWidth,
      ...contentMinWidth,
    }
  }

  render() {
    const block = BEM.block('popover').element('content')

    return (
      <Host
        class={{
          ...block.class(),
          ...block.modifier('expanded').class(this.expanded),
          ...block.modifier('spaceless').class(this.spaceless),
          ...block.modifier('no-shadow').class(this.noShadow),
          ...block.modifier(`radius-${this.radius}`).class(),
          ...block.modifier(`color-${this.color}`).class(),
        }}
        role="tooltip"
        style={this.contentStyle}
      >
        <div class={{ ...block.element('inner').class() }} style={this.innerStyle}>
          <slot></slot>
        </div>
        <div class={{ ...block.element('arrow').class() }} data-popper-arrow></div>
      </Host>
    )
  }
}
