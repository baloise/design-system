import { Component, h, Host, Element, Prop } from '@stencil/core'

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
    return (
      <Host
        class={{
          'popover-content has-background-white has-radius-normal has-shadow': true,
          'is-expanded': this.expanded,
        }}
        role="menu"
        style={this.contentStyle}
      >
        <div class="inner" style={this.innerStyle}>
          <slot></slot>
        </div>
      </Host>
    )
  }
}
