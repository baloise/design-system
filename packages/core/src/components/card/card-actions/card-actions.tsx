import { Component, h, Host, Prop } from '@stencil/core'
@Component({
  tag: 'bal-card-actions',
  shadow: true,
})
export class CardActions {
  /**
   * The value of the button, which is submitted with the form data.
   */
  @Prop() align?: DS.CardActionsAlignment

  render() {
    return (
      <Host role="contentinfo">
        <bal-button-group class="m-none" align={this.align}>
          <slot />
        </bal-button-group>
      </Host>
    )
  }
}
