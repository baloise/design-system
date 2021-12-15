import { Component, Host, h } from '@stencil/core'

@Component({
  tag: 'bal-hint-text',
})
export class HintText {
  render() {
    return (
      <Host>
        <p class="has-text-white">
          <slot></slot>
        </p>
      </Host>
    )
  }
}
