import { Component, Host, h, Prop } from '@stencil/core'

@Component({
  tag: 'bal-list-item-icon',
})
export class ListItemIcon {
  /**
   * If `true` the icon is on the right side of the list item. Default is the left side.
   */
  @Prop() right = false

  render() {
    return (
      <Host
        class={{
          'bal-list__item__icon': true,
          'bal-list__item__icon--right': this.right,
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}
