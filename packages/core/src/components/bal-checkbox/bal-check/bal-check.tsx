import { Component, ComponentInterface, h, Host, Prop } from '@stencil/core'
import { BEM } from '../../../utils/bem'

@Component({
  tag: 'bal-check',
  styleUrl: './bal-check.host.scss',
  shadow: true,
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
    const checked = !!this.checked
    const disabled = !!this.disabled
    const invalid = !!this.invalid
    const inverted = !!this.inverted

    return (
      <Host
        class={{
          'is-checked': checked,
          'is-disabled': disabled,
          'is-invalid': invalid,
          'is-inverted': inverted,
          'is-hovered': this.hovered,
          'is-pressed': this.pressed,
        }}
      >
        <bal-icon
          name="check"
          size="small"
          // color="white"
          // colorHovered="white"
          // colorPressed="white"
          // aria-hidden="true"
          // hovered={this.hovered}
          // pressed={this.pressed}
        ></bal-icon>
      </Host>
    )
  }
}
