import { Component, h, ComponentInterface, Host, Element, Prop } from '@stencil/core'

@Component({
  tag: 'bal-stage-body',
})
export class StageBody implements ComponentInterface {
  @Element() el!: HTMLElement

  /**
   * If `true` the inner container uses the compact layout.
   */
  @Prop() compact = false

  render() {
    return (
      <Host class="hero-body">
        <div
          class={{
            'container': true,
            'is-compact': this.compact,
          }}
        >
          <slot></slot>
        </div>
      </Host>
    )
  }
}
