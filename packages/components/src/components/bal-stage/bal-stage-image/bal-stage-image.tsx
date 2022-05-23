import { Component, h, ComponentInterface, Host, Element, Prop } from '@stencil/core'

@Component({
  tag: 'bal-stage-image',
})
export class StageImage implements ComponentInterface {
  @Element() el!: HTMLElement

  /**
   * Source of the background image.
   */
  @Prop() src = ''

  render() {
    return (
      <Host
        class={{
          'bal-stage-image': true,
        }}
      >
        <img src={this.src} />
      </Host>
    )
  }
}
