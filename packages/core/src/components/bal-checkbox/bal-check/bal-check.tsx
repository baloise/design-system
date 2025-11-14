import { Component, ComponentInterface, h, Host, Prop } from '@stencil/core'
import { BEM } from '../../../utils/bem'

@Component({
  tag: 'bal-check',
  styleUrl: './bal-check.scss',
})
export class Check implements ComponentInterface {
  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * If `true`, the checkbox is selected.
   */
  @Prop({ mutable: true }) checked = false

  /**
   * If `true` the component gets a invalid red style.
   */
  @Prop() invalid?: boolean = undefined

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop() disabled?: boolean = undefined

  /**
   * If `true`, the checkbox is inverted and works on dark backgrounds.
   */
  @Prop() inverted?: boolean = undefined

  /**
   * @internal
   */
  @Prop() hovered = false

  /**
   * @internal
   */
  @Prop() pressed = false

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const block = BEM.block('check')
    const checked = !!this.checked
    const disabled = !!this.disabled
    const invalid = !!this.invalid
    const inverted = !!this.inverted

    return (
      <Host
        class={{
          ...block.class(),
          ...block.modifier('checked').class(checked),
          ...block.modifier('disabled').class(disabled),
          ...block.modifier('invalid').class(invalid),
          ...block.modifier('inverted').class(inverted),
          ...block.modifier('hovered').class(this.hovered),
          ...block.modifier('pressed').class(this.pressed),
        }}
      >
        <bal-icon
          name="check"
          color="white"
          colorHovered="white"
          colorPressed="white"
          size="small"
          aria-hidden="true"
          hovered={this.hovered}
          pressed={this.pressed}
        ></bal-icon>
      </Host>
    )
  }
}
