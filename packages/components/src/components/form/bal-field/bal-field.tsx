import { Component, h, Host, Prop, Element, Watch } from '@stencil/core'

@Component({
  tag: 'bal-field',
})
export class Field {
  @Element() element!: HTMLElement

  /**
   * If `true` the component gets a invalid style.
   */
  @Prop() invalid = false

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop() disabled = false

  /**
   * If `true` the element can not mutated, meaning the user can not edit the control.
   */
  @Prop() readonly = false

  /**
   * If `true` the field can be used on blue background.
   */
  @Prop() inverted = false

  /**
   * If `true` a loading spinner is visible at the end of the input
   */
  @Prop() loading = false

  private formControlElement = ['bal-field-control']
  private inputElements = ['bal-input', 'bal-textarea', 'bal-select', 'bal-datepicker', 'bal-checkbox', 'bal-radio']
  private formElements = [...this.formControlElement, 'bal-field-label', 'bal-field-message']

  @Watch('invalid')
  invalidHandler() {
    this.notifyComponents<{ invalid: boolean }>([...this.inputElements, ...this.formElements], input => {
      input.invalid = this.invalid
    })
  }

  @Watch('readonly')
  @Watch('disabled')
  @Watch('loading')
  @Watch('inverted')
  restHandler() {
    this.notifyComponents<{
      readonly: boolean
      disabled: boolean
      loading: boolean
      inverted: boolean
    }>([...this.inputElements, ...this.formControlElement], input => {
      input.readonly = this.readonly
      input.disabled = this.disabled
      input.loading = this.loading
      input.inverted = this.inverted
    })
  }

  private notifyComponents<T>(selectors: string[], callback: (component: T) => void) {
    const components = this.element.querySelectorAll<Element>(selectors.join(', '))
    components.forEach(c => callback(c as any))
  }

  componentWillLoad() {
    this.invalidHandler()
    this.restHandler()
  }

  render() {
    return (
      <Host
        class={{
          'is-invalid': this.invalid,
          'is-disabled': this.disabled,
        }}
      >
        <div
          class={{
            'form': true,
            'is-inverted': this.inverted,
            'is-disabled': this.disabled || this.readonly,
          }}
        >
          <slot></slot>
        </div>
      </Host>
    )
  }
}
