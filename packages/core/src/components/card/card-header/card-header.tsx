import { Component, Host, Prop, h } from '@stencil/core'

@Component({
  tag: 'ds-card-header',
  styleUrl: 'card-header.host.scss',
  shadow: true,
})
export class CardHeader {
  @Prop() direction: DS.CardHeaderDirection = 'row'

  render() {
    return (
      <Host role="banner">
        <slot></slot>
      </Host>
    )
  }
}
