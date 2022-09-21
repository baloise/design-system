import { Component, h, Prop, Host, ComponentInterface } from '@stencil/core'
import { Props } from '../../../types'
import { BEM } from '../../../utils/bem'

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
    const block = BEM.block('button-group')
    return (
      <Host
        class={{
          ...block.class(),
          ...block.modifier(`position-${this.position}`).class(),
          ...block.modifier(`direction-${this.direction}`).class(),
        }}
      >
        <div
          class={{
            'field': true,
            'is-grouped': true,
            'is-reverse': this.reverse,
            [`has-direction-${this.direction}`]: true,
          }}
        >
          <slot />
        </div>
      </Host>
    )
  }
}
