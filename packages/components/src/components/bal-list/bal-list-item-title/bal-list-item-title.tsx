import { Component, Host, h } from '@stencil/core'

@Component({
  tag: 'bal-list-item-title',
  scoped: false,
  shadow: false,
})
export class ListItemTitle {
  render() {
    return (
      <Host class="bal-list-item-title">
        <bal-text>
          <slot></slot>
        </bal-text>
      </Host>
    )
  }
}
