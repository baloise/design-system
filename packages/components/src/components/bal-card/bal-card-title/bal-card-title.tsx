import { Component, Host, h, Prop } from '@stencil/core'

@Component({
  tag: 'bal-card-title',
})
export class CardTitle {
  /**
   * If `true` the card text color becomes white.
   */
  @Prop() inverted = false

  render() {
    return (
      <Host class="bal-card-title">
        <bal-heading level="h4" space="none" inverted={this.inverted}>
          <slot></slot>
        </bal-heading>
      </Host>
    )
  }
}
