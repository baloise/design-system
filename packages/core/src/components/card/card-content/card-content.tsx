import { Component, Host, h } from '@stencil/core'

@Component({
  tag: 'ds-card-content',
  styleUrl: 'card-content.host.scss',
  shadow: true,
})
export class CardContent {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    )
  }
}
