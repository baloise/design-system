import { Component, Host, h, Prop } from '@stencil/core'
import { Props } from '../../../types'

@Component({
  tag: 'bal-card-subtitle',
})
export class CardSubtitle {
  /**
   * If `true` the card text color becomes white.
   */
  @Prop() inverted = false

  /**
   * If `true` the card text color is bold.
   */
  @Prop() bold = false

  /**
   * If `true` the card text color becomes white.
   */
  @Prop() color: Props.BalHeadingColor = 'info'

  render() {
    return (
      <Host class="mx-5">
        <bal-heading subtitle={!this.bold} level="h5" space="none" color={this.color} inverted={this.inverted}>
          <slot></slot>
        </bal-heading>
      </Host>
    )
  }
}
