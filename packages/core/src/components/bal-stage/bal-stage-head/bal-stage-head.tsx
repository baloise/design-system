import { Component, ComponentInterface, Element, h, Host } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'

@Component({
  tag: 'bal-stage-head',
})
export class StageHead implements ComponentInterface {
  @Element() el!: HTMLStencilElement

  render() {
    return (
      <Host class="hero-head">
        <slot></slot>
      </Host>
    )
  }
}
