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
        <p class="text-small">
          <slot></slot>
        </p>
      </Host>
    )
  }
}
