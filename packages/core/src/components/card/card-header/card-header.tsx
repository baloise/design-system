import { Component, Host, Prop, h } from '@stencil/core'

@Component({
  tag: 'bal-card-header',
  styleUrl: 'bal-card-header.host.scss',
  shadow: true,
})
export class CardHeader {
  @Prop() direction: BalProps.BalCardHeaderDirection = 'row'

  render() {
    return (
      <Host role="banner">
        <slot></slot>
      </Host>
    )
  }
}
