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
  @Prop() position: 'right' | 'center' | '' = ''

  get buttonGroupPosition(): 'right' | 'center' | '' {
    if (this.right) {
      return 'right'
    }

    return this.position
  }

  render() {
    return (
      <Host class="mx-5 mb-5">
        <bal-button-group position={this.buttonGroupPosition}>
          <slot></slot>
        </bal-button-group>
      </Host>
    )
  }
}
