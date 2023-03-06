import { Component, Host, h, Prop } from '@stencil/core'
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
  @Prop() position: BalProps.BalCardActionsPosition = ''

  get buttonGroupPosition(): BalProps.BalCardActionsPosition {
    if (this.right) {
      return 'right'
    }

    return this.position
  }

  render() {
    return (
      <Host class="bal-card-actions">
        <bal-button-group class="m-none" position={this.buttonGroupPosition}>
          <slot />
        </bal-button-group>
      </Host>
    )
  }
}
