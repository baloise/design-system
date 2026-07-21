import { Component, ComponentInterface, Element, h, Host } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'

@Component({
  tag: 'bal-stage-foot',
})
export class StageFoot implements ComponentInterface {
  @Element() el!: HTMLStencilElement

  render() {
    return (
      <Host class="hero-foot">
        <slot></slot>
      </Host>
    )
  }
}
