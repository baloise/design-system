import { Component, Host, h, Prop } from '@stencil/core'

@Component({
  tag: 'bal-data',
  styleUrl: 'bal-data.scss',
  shadow: false,
  scoped: false,
})
export class Data {
  /**
   * If `true` the data list is horizontal instead of vertical.
   */
  @Prop() horizontal = false

  render() {
    return (
      <Host
        class={{
          'bal-data': true,
          'is-horizontal': this.horizontal,
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}
