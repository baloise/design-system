import { Component, Host, h } from '@stencil/core'

@Component({
  tag: 'bal-hint-title',
})
export class HintTitle {
  render() {
    return (
      <Host>
        <h4 class="title is-size-4 has-text-white">
          <slot></slot>
        </h4>
      </Host>
    )
  }
}
