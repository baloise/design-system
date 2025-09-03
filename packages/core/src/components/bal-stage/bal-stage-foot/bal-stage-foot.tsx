import { Component, ComponentInterface, Element, h, Host } from '@stencil/core'

@Component({
  tag: 'bal-stage-foot',
})
export class StageFoot implements ComponentInterface {
  @Element() el!: HTMLElement

  render() {
    return (
      <Host class="hero-foot">
        <slot />
      </Host>
    )
  }
}
