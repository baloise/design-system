import { Component, Host, h, Prop } from '@stencil/core'

@Component({
  tag: 'bal-card-subtitle',
})
export class CardSubtitle {
  /**
   * If `true` the card text color becomes white.
   */
  @Prop() inverted = false

  render() {
    return (
      <Host class="mx-5">
        <bal-heading subtitle level="h5" space="none" color="info" inverted={this.inverted}>
          <slot></slot>
        </bal-heading>
      </Host>
    )
  }
}
