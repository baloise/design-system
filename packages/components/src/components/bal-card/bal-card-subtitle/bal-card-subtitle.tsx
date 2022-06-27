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
  @Prop() color: Props.BalHeadingColor = ''

  render() {
    return (
      <Host class="bal-card-subtitle">
        <bal-text bold={this.bold} space="none" color={this.inverted ? 'white' : this.color}>
          <slot></slot>
        </bal-text>
      </Host>
    )
  }
}
