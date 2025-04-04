import { Component, ComponentInterface, h, Host, Prop } from '@stencil/core'
import { BEM } from '../../../utils/bem'

@Component({
  tag: 'bal-switch',
  styleUrl: './bal-switch.sass',
})
export class Switch implements ComponentInterface {
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
   * RENDER
   * ------------------------------------------------------
   */

  // TODO-MZ add color states (invalid, selected, disabled)
  render() {
    const block = BEM.block('switch')
    const checked = !!this.checked
    const disabled = !!this.disabled
    const invalid = !!this.invalid

    return (
      <Host
        class={{
          ...block.class(),
          ...block.modifier('checked').class(checked),
          ...block.modifier('disabled').class(disabled),
          ...block.modifier('invalid').class(invalid),
        }}
        onClick={() => (this.checked = !this.checked)}
      >
          <bal-icon
            name="check"
            color="white"
            size="small"
            aria-hidden="true"
            class={{
              ...block.element('icon').modifier('checked').class(checked),
            }}
          ></bal-icon>
            <div class={{
              ...block.element('toggle').class(),
              ...block.element('toggle').modifier('checked').class(checked),
              ...block.element('toggle').modifier('disabled').class(disabled),
              ...block.element('toggle').modifier('invalid').class(invalid)
            }}></div>
      </Host>
    )
  }
}
