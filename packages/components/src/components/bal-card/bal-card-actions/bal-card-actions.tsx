import { Component, Host, h, Prop } from '@stencil/core'
@Component({
  tag: 'bal-card-actions',
})
export class CardActions {
  /**
   * The value of the button, which is submitted with the form data.
   */
  @Prop() position: BalProps.BalCardActionsPosition = ''

  render() {
    return (
      <Host class="bal-card-actions">
        <bal-button-group class="m-none" position={this.position}>
          <slot />
        </bal-button-group>
      </Host>
    )
  }
}
