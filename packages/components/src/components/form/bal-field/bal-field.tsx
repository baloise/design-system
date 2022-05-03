import { Component, h, Host, Prop, Element, Watch } from '@stencil/core'

@Component({
  tag: 'bal-field',
})
export class Field {
  @Element() element!: HTMLElement

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
   * If `true` a loading spinner is visible at the end of the input
   */
  @Prop() loading = false

  private formControlElement = ['bal-field-control']
  private inputElements = ['bal-input', 'bal-textarea', 'bal-select', 'bal-datepicker', 'bal-checkbox', 'bal-radio']
  private formElements = [...this.formControlElement, 'bal-field-label', 'bal-field-message']

  @Watch('valid')
  @Watch('invalid')
  validationHandler() {
    this.notifyComponents<{ valid: boolean; invalid: boolean }>(
      [...this.inputElements, ...this.formElements],
      input => {
        input.invalid = this.invalid
        input.valid = this.valid
      },
    )
  }

  @Watch('readonly')
  @Watch('disabled')
  usageHandler() {
    this.notifyComponents<{
      readonly: boolean
      disabled: boolean
    }>([...this.inputElements, ...this.formElements], input => {
      input.readonly = this.readonly
      input.disabled = this.disabled
    })
  }

  @Watch('loading')
  loadingHandler() {
    this.notifyComponents<{
      loading: boolean
    }>([...this.inputElements, ...this.formControlElement], input => {
      input.loading = this.loading
    })
  }

  private notifyComponents<T>(selectors: string[], callback: (component: T) => void) {
    const components = this.element.querySelectorAll<Element>(selectors.join(', '))
    components.forEach(c => callback(c as any))
  }

  componentWillLoad() {
    this.validationHandler()
    this.usageHandler()
    this.loadingHandler()
  }

  render() {
    return (
      <Host
        class={{
          'bal-field': true,
          'field': true,
        }}
      >
        <slot></slot>
      </Host>
    )
    // return (
    //   <Host
    //     class={{
    //       'is-invalid': this.invalid,
    //       'is-disabled': this.disabled,
    //     }}
    //   >
    //     <div
    //       class={{
    //         'form': true,
    //         'is-inverted': this.inverted,
    //         'is-disabled': this.disabled || this.readonly,
    //       }}
    //     >
    //       <slot></slot>
    //     </div>
    //   </Host>
    // )
  }
}
