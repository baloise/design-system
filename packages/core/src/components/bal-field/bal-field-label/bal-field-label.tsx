import { Component, h, Host, Prop, Element } from '@stencil/core'

@Component({
  tag: 'bal-field-label',
  shadow: false,
  scoped: true,
})
export class FieldLabel {
  @Element() element!: HTMLElement

  private parentBalFieldElement!: HTMLBalFieldElement | null

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * The value of the for attribute must be a single id for a labeled
   * form-related element in the same document as the <label> element.
   * So, any given label element can be associated with only one form control.
   */
  @Prop() htmlFor?: string = undefined

  /**
   * If `true` the form control needs to be filled. If it is set to
   * `false` an optional label is added to the label..
   */
  @Prop() required = true

  /**
   * If `true` the component gets a valid green style.
   */
  @Prop() valid?: boolean = undefined

  /**
   * If `true` the component gets a invalid red style.
   */
  @Prop() invalid?: boolean = undefined

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop() disabled?: boolean = undefined

  /**
   * If `true` the element can not mutated, meaning the user can not edit the control.
   */
  @Prop() readonly?: boolean = undefined

  /**
   * Defines the size of the font. Default is like a heading 5 and small is used
   * with the form fields.
   */
  @Prop() size: BalProps.BalFieldLabelSize = 'small'

  /**
   * Defines the font weight of the label.
   */
  @Prop() weight: BalProps.BalFieldLabelWeight = 'bold'

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

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

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    return (
      <Host class="bal-field-label">
        <bal-label
          multiline
          size={this.size}
          htmlFor={this.htmlFor}
          required={this.required}
          valid={this.valid}
          invalid={this.invalid}
          disabled={this.disabled}
          readonly={this.readonly}
          weight={this.weight}
        >
          <slot></slot>
        </bal-label>
      </Host>
    )
  }
}
