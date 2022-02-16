import { Component, Host, h } from '@stencil/core'

@Component({
  tag: 'bal-list-item-subtitle',
  scoped: false,
  shadow: false,
})
export class ListItemSubtitle {
  render() {
    return (
      <Host class="bal-list-item-subtitle">
        <bal-text small>
          <slot></slot>
        </bal-text>
      </Host>
    )
  }
}
