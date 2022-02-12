import { Component, Host, h } from '@stencil/core'

@Component({
  tag: 'bal-hint-title',
})
export class HintTitle {
  render() {
    return (
      <Host>
        <bal-heading level="h5" color="primary" space="bottom">
          <slot></slot>
        </bal-heading>
      </Host>
    )
  }
}
