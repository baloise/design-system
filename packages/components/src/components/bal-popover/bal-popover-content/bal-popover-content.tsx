import { Component, h, Host, Element, Prop } from '@stencil/core'
import { Props } from '../../../props'
import { BEM } from '../../../utils/bem'

@Component({
  tag: 'bal-popover-content',
})
export class PopoverContent {
  @Element() el!: HTMLElement

  /**
   * Limit the height of the popover content. Pass the amount of pixel.
   */
  @Prop() scrollable = 0

  /**
   * Define the max width of the popover content.
   */
  @Prop() contentWidth = 0

  /**
   * Defines background color of the content.
   */
  @Prop() color: Props.BalPopoverContentColor = 'white'

  /**
   * If `true` the content has a min width of 100%.
   */
  @Prop() expanded = false

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

    if (this.contentWidth > 0) {
      contentWidth = { 'max-width': `${this.contentWidth}px` }
    }

    return {
      ...contentWidth,
    }
  }

  render() {
    const block = BEM.block('popover').element('content')

    return (
      <Host
        class={{
          ...block.class(),
          ...block.modifier('expanded').class(this.expanded),
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
