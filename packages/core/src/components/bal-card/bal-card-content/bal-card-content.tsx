import { Component, Host, h } from '@stencil/core'

@Component({
  tag: 'bal-card-content',
  styleUrl: 'bal-card-content.host.scss',
  shadow: true,
})
export class CardContent {
  render() {
    return (
      <Host class="card-content">
        <slot></slot>
      </Host>
    )
  }
}
