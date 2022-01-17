import { Component, Host, h, Prop } from '@stencil/core'

@Component({
  tag: 'bal-card-actions',
})
export class CardActions {
  /**
   * If `true` the buttons start form right to left.
   */
  @Prop() right = false

  render() {
    return (
      <Host class="mx-5 mb-5">
        <bal-button-group position={this.right ? 'right' : ''}>
          <slot></slot>
        </bal-button-group>
      </Host>
    )
  }
}
