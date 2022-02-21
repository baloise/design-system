import { Component, Host, h } from '@stencil/core'

@Component({
  tag: 'bal-hint-text',
})
export class HintText {
  render() {
    return (
      <Host>
        <p>
          <slot></slot>
        </p>
      </Host>
    )
  }
}
