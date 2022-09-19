import { Component, Host, h } from '@stencil/core'

@Component({
  tag: 'bal-list-item-subtitle',
  scoped: false,
  shadow: false,
})
export class ListItemSubtitle {
  render() {
    return (
      <Host class="bal-list__item__subtitle">
        <bal-text size="small" space="none">
          <slot></slot>
        </bal-text>
      </Host>
    )
  }
}
