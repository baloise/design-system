import { Component, Host, h } from '@stencil/core'

@Component({
  tag: 'bal-card-content',
})
export class CardContent {
  render() {
    return (
      <Host class="mx-5">
        <p>
          <slot></slot>
        </p>
      </Host>
    )
  }
}
