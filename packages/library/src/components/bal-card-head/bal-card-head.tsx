import { Component, Host, h } from '@stencil/core'

@Component({
  tag: 'bal-card-head',
  shadow: false,
  scoped: false,
})
export class CardHead {
  render() {
    return (
      <Host class={['bal-card-head'].join(' ')} role="heading">
        <slot></slot>
      </Host>
    )
  }
}
