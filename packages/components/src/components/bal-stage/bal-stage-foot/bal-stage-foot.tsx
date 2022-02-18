import { Component, h, ComponentInterface, Host, Element } from '@stencil/core'

@Component({
  tag: 'bal-stage-foot',
})
export class StageFoot implements ComponentInterface {
  @Element() el!: HTMLElement

  render() {
    return (
      <Host class="hero-foot">
        <slot></slot>
      </Host>
    )
  }
}
