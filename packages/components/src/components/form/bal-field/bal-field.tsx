import { Component, h, Host, Prop, Element, Watch } from '@stencil/core'

@Component({
  tag: 'bal-field',
})
export class Field {
  @Element() element!: HTMLElement

  /**
   * If `true` the component gets a invalid style.
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
   * If `true` the field can be used on blue background.
   */
  @Prop() inverted?: boolean = undefined

  /**
   * If `true` a loading spinner is visible at the end of the input
   */
  @Prop() loading?: boolean = undefined

  private formControlElement = ['bal-field-control']
  private inputElements = ['bal-input', 'bal-textarea', 'bal-select', 'bal-datepicker']
  private formElements = [...this.formControlElement, 'bal-field-label', 'bal-field-message']

  private updateProps(selectors: string[], key: string) {
    const value = (this as any)[key]
    if (value !== undefined) {
      this.notifyComponents<any>(selectors, input => (input[key] = value))
    }
  }

  @Watch('invalid')
  invalidHandler() {
    this.updateProps([...this.inputElements, ...this.formElements], 'invalid')
  }

  @Watch('readonly')
  readonlyHandler() {
    this.updateProps([...this.inputElements, ...this.formControlElement], 'readonly')
  }

  @Watch('disabled')
  disabledHandler() {
    this.updateProps([...this.inputElements, ...this.formControlElement], 'disabled')
  }

  @Watch('loading')
  loadingHandler() {
    this.updateProps([...this.inputElements, ...this.formControlElement], 'loading')
  }

  @Watch('inverted')
  invertedHandler() {
    this.updateProps([...this.inputElements, ...this.formControlElement], 'inverted')
  }

  private notifyComponents<T>(selectors: string[], callback: (component: T) => void) {
    const components = this.element.querySelectorAll<Element>(selectors.join(', '))
    components.forEach(c => callback(c as any))
  }

  componentWillLoad() {
    this.invalidHandler()
    this.readonlyHandler()
    this.disabledHandler()
    this.loadingHandler()
    this.invertedHandler()
  }

  render() {
    return (
      <Host
        class={{
          'is-invalid': this.invalid === true,
        }}
      >
        <div
          class={{
            'form': true,
            'is-inverted': this.inverted === true,
            'is-disabled': this.disabled === true || this.readonly === true,
          }}
        >
          <slot></slot>
        </div>
      </Host>
    )
  }
}
