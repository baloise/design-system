import { Component, Host, h, Prop } from '@stencil/core'

@Component({
  tag: 'bal-list',
  styleUrl: 'bal-list.scss',
  shadow: false,
  scoped: false,
})
export class List {
  /**
   * If `true` the list can be used on a dark backround
   */
  @Prop() inverted = false

  render() {
    return (
      <Host
        role="listbox"
        class={{
          'bal-list': true,
          'is-inverted': this.inverted,
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}
