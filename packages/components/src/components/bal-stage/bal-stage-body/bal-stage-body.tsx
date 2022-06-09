import { Component, h, ComponentInterface, Host, Element, Prop } from '@stencil/core'

@Component({
  tag: 'bal-stage-body',
})
export class StageBody implements ComponentInterface {
  @Element() el!: HTMLElement

  /**
   * class to set the container width
   */
  @Prop() containerClass = 'is-wide'

  render() {
    return (
      <Host
        class={{
          'bal-stage-body': true,
        }}
      >
        <div class={`container ${this.containerClass}`}>
          <slot></slot>
        </div>
      </Host>
    )
  }
}
