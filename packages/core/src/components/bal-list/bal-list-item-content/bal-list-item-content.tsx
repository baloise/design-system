import { Component, Host, h, Prop } from '@stencil/core'

@Component({
  tag: 'bal-list-item-content',
})
export class ListItemContent {
  @Prop() contentAlignment?: string

  render() {
    return (
      <Host
        class={{
          'bal-list__item__content': true,
          [`bal-list__item__content--${this.contentAlignment}`]: this.contentAlignment !== undefined,
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}
