import { Component, h, ComponentInterface, Host, Element } from '@stencil/core'

@Component({
  tag: 'bal-stage-body',
})
export class StageBody implements ComponentInterface {
  @Element() el!: HTMLElement

  render() {
    return (
      <Host
        class={{
          'bal-stage-body': true,
        }}
      >
        <div class="container">
          <slot></slot>
        </div>
      </Host>
    )
  }
}
