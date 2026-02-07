import { Component, ComponentInterface, h, Host, Prop } from '@stencil/core'

@Component({
  tag: 'bal-switch',
  styleUrl: './bal-switch.host.scss',
  shadow: true,
})
export class Switch implements ComponentInterface {
  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * If `true`, the checkbox is selected.
   */
  @Prop({ reflect: true }) checked = false

  /**
   * If `true` the component gets a invalid red style.
   */
  @Prop({ reflect: true }) invalid?: boolean = undefined

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop({ reflect: true }) disabled?: boolean = undefined

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
    // const checked = !!this.checked
    // const disabled = !!this.disabled
    // const invalid = !!this.invalid

    return (
      <Host
        class={{
          // 'is-checked': checked,
          // 'is-disabled': disabled,
          // 'is-invalid': invalid,
          'is-hovered': this.hovered,
          'is-pressed': this.pressed,
        }}
      >
        <bal-icon
          name="check"
          size="small"
          // class={{
          //   ...block.element('icon').modifier('checked').class(checked),
          // }}
        ></bal-icon>
        <div
          id="toggle"
          part="toggle"
          // class={{
          //   ...block.element('toggle').modifier('checked').class(checked),
          //   ...block.element('toggle').modifier('disabled').class(disabled),
          //   ...block.element('toggle').modifier('invalid').class(invalid),
          //   ...block.modifier('hovered').class(this.hovered),
          //   ...block.modifier('pressed').class(this.pressed),
          // }}
        ></div>
      </Host>
    )
  }
}
