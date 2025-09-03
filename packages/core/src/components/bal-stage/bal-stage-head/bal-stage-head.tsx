import { Component, ComponentInterface, Element, h, Host } from '@stencil/core'

@Component({
  tag: 'bal-stage-head',
})
export class StageHead implements ComponentInterface {
  @Element() el!: HTMLElement

  render() {
    return (
      <Host class="hero-head">
        <slot />
      </Host>
    )
  }
}
