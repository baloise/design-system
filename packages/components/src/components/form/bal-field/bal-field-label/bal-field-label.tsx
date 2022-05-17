import { Component, h, Host, Prop, Element } from '@stencil/core'
import { Props } from '../../../..'

@Component({
  tag: 'bal-field-label',
  shadow: false,
  scoped: true,
})
export class FieldLabel {
  @Element() element!: HTMLElement
  parentBalFieldElement!: HTMLBalFieldElement | null

  /**
   * If `true` the component gets a invalid red style.
   */
  @Prop() invalid = false

  /**
   * If `true` the component gets a valid green style.
   */
  @Prop() valid = false

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop() disabled = false

  /**
   * If `true` the element can not mutated, meaning the user can not edit the control.
   */
  @Prop() readonly = false

  /**
   * If `true` the component gets a invalid style.
   */
  @Prop() weight: Props.BalFieldLabelWeight = 'bold'

  componentDidLoad() {
    if (this.element) {
      this.parentBalFieldElement = this.element.closest('bal-field')
      if (this.parentBalFieldElement) {
        this.parentBalFieldElement.classList.add('has-label')
      }
    }
  }

  disconnectedCallback() {
    if (this.parentBalFieldElement) {
      this.parentBalFieldElement.classList.remove('has-label')
    }
  }

  render() {
    return (
      <Host class="bal-field-label">
        <label
          class={{
            'label': true,
            'is-disabled': this.disabled || this.readonly,
            'is-success': this.valid,
            'is-danger': this.invalid,
            'is-regular': this.weight === 'regular',
          }}
        >
          <slot></slot>
        </label>
      </Host>
    )
  }
}
