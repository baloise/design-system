import { Component, h, Prop, Host, ComponentInterface } from '@stencil/core'
import { Props } from '../../../types'

@Component({
  tag: 'bal-button-group',
})
export class ButtonGroup implements ComponentInterface {
  /**
   * The value of the button, which is submitted with the form data.
   */
  @Prop() position: Props.BalButtonGroupPosition = ''

  /**
   * `auto` will position the button items vertical and full width.
   * `row` will force that the buttons are also horizontal on mobile.
   */
  @Prop() direction: Props.BalButtonGroupDirection = 'auto'

  /**
   * If `true` the flex direction is used in reverse on mobile.
   */
  @Prop() reverse = false

  render() {
    return (
      <Host>
        <div
          class={{
            'field': true,
            'is-grouped': true,
            'is-reverse': this.reverse,
            [`has-direction-${this.direction}`]: true,
            'is-grouped-right': this.position === 'right',
            'is-grouped-centered': this.position === 'center',
          }}
        >
          <slot />
        </div>
      </Host>
    )
  }
}
