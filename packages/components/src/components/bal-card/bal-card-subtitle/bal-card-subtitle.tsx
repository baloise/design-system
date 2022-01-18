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
        <bal-text space="none" color={this.inverted ? 'white' : 'primary'}>
          <slot></slot>
        </bal-text>
      </Host>
    )
  }
}
