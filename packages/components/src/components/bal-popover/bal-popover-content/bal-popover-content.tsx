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
   * If `true` the field spans over the whole width.
   */
  @Prop() contentWidth = 0

  get contentStyle() {
    let scrollable = {}
    let contentWidth = {}

    if (this.contentWidth > 0) {
      contentWidth = { 'max-width': this.contentWidth }
    }

    if (this.scrollable > 0) {
      scrollable = {
        'max-height': `${this.scrollable}px`,
        'overflow': 'auto',
      }
    }

    return {
      ...scrollable,
      ...contentWidth,
    }
  }

  render() {
    return (
      <Host class="popover-content has-background-white has-radius-normal has-shadow" role="menu">
        <div class="inner" style={this.contentStyle}>
          <slot></slot>
        </div>
      </Host>
    )
  }
}
