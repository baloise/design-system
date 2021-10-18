import { Component, Host, h, Prop } from '@stencil/core'

@Component({
  tag: 'bal-list-item-icon',
  shadow: false,
  scoped: false,
})
export class ListItemIcon {
  @Prop() dense = false

  render() {
    return (
      <Host
        class={{
          'bal-list-item-icon': true,
          'is-dense': this.dense,
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}
