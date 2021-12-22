import { Component, h, Host, Element, Prop } from '@stencil/core'

@Component({
  tag: 'bal-dropdown-menu',
})
export class DropdownMenu {
  @Element() el!: HTMLElement

  /**
   * Limit the height of the dropdown content. Pass the amount of pixel.
   */
  @Prop() scrollable = 0

  get contentStyle() {
    if (this.scrollable === 0) {
      return {}
    } else {
      const maxHeight = `${this.scrollable}px`
      return {
        'max-height': maxHeight,
        'overflow': 'auto',
      }
    }
  }

  render() {
    return (
      <Host class="dropdown-menu" id="dropdown-menu" role="menu">
        <div class="dropdown-content" style={this.contentStyle}>
          <slot></slot>
        </div>
      </Host>
    )
  }
}
