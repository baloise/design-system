import { Component, Host, h, Prop } from '@stencil/core'

@Component({
  tag: 'bal-data',
  styleUrl: 'bal-data.scss',
  shadow: false,
  scoped: false,
})
export class Data {
  /**
   * If `true` a bottom border is added to the data-item.
   */
  @Prop() border = false

  /**
   * If `true` the data list is horizontal instead of vertical.
   */
  @Prop() horizontal = false

  render() {
    return (
      <Host class={['bal-data', this.border ? 'has-border' : '', this.horizontal ? 'is-horizontal' : ''].join(' ')}>
        <slot></slot>
      </Host>
    )
  }
}
