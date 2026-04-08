import { Component, ComponentInterface, h, Host, Prop } from '@stencil/core'

@Component({
  tag: 'bal-check',
  styleUrl: './check.host.scss',
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
   * If `true`, the checkbox is inverted and works on dark backgrounds.
   */
  @Prop({ reflect: true }) inverted?: boolean = undefined

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
    return (
      <Host
        class={{
          'is-hovered': this.hovered,
          'is-pressed': this.pressed,
        }}
      >
        <bal-icon name="check" size="sm"></bal-icon>
      </Host>
    )
  }
}
