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
      <Host class="hero-background has-opacity-80">
        <img class="has-opacity-80" src={this.src} />
      </Host>
    )
  }
}
