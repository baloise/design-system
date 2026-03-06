import { Component, h, Host, Prop } from '@stencil/core'
@Component({
  tag: 'bal-card-actions',
  styleUrl: './bal-card-actions.host.scss',
  shadow: true,
})
export class CardActions {
  /**
   * The value of the button, which is submitted with the form data.
   */
  @Prop() position: BalProps.BalCardActionsPosition = ''

  render() {
    return (
      <Host role="contentinfo">
        <bal-button-group class="m-none" position={this.position}>
          <slot />
        </bal-button-group>
      </Host>
    )
  }
}
