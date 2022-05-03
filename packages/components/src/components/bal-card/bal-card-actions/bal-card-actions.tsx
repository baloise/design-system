import { Component, Host, h, Prop } from '@stencil/core'
import { Props } from '../../../types'

@Component({
  tag: 'bal-card-actions',
})
export class CardActions {
  /**
   * @deprecated use position="right"
   * If `true` the buttons start form right to left.
   */
  @Prop() right = false

  /**
   * The value of the button, which is submitted with the form data.
   */
  @Prop() position: Props.BalCardActionsPosition = ''

  get buttonGroupPosition(): Props.BalCardActionsPosition {
    if (this.right) {
      return 'right'
    }

    return this.position
  }

  render() {
    return (
      <Host class="bal-card-actions mx-5">
        <bal-button-group class="m-0" position={this.buttonGroupPosition}>
          <slot></slot>
        </bal-button-group>
      </Host>
    )
  }
}
