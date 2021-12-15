import { Component, Host, h } from '@stencil/core'

@Component({
  tag: 'bal-card-steps',
})
export class CardSteps {
  render() {
    return (
      <Host class={['bal-card-steps'].join(' ')} role="heading">
        <slot></slot>
      </Host>
    )
  }
}
