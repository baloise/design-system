import { Component, h, Host, Prop, Element, Watch } from '@stencil/core'
import { observeItems } from '../../../utils/observer'

@Component({
  tag: 'bal-field',
})
export class Field {
  @Element() el!: HTMLElement

  private mutationO?: MutationObserver
  private formControlElement = ['bal-field-control']
  private inputElements = [
    'bal-input',
    'bal-number-input',
    'bal-textarea',
    'bal-select',
    'bal-datepicker',
    'bal-checkbox',
    'bal-radio',
    'bal-input-group',
    'bal-input-stepper',
    'bal-file-upload',
  ]
  private formElements = [...this.formControlElement, 'bal-field-label', 'bal-field-message']

  /**
   * If `true` the form control needs to be filled. If it is set to
   * `false` an optional label is added to the label..
   */
  @Prop() required?: boolean = undefined

  @Watch('required')
  requiredHandler() {
    this.updateProps([...this.inputElements, 'bal-field-label'], 'required')
  }

  /**
   * If `true` the component gets a invalid red style.
   */
  @Prop() invalid?: boolean = undefined

  @Watch('invalid')
  invalidHandler() {
    this.updateProps([...this.inputElements, ...this.formElements], 'invalid')
  }

  /**
   * If `true` the component gets a valid green style.
   */
  @Prop() valid = false

  @Watch('valid')
  validHandler() {
    this.updateProps([...this.inputElements, ...this.formElements], 'valid')
  }

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop() disabled?: boolean = undefined

  @Watch('disabled')
  disabledHandler() {
    this.updateProps([...this.inputElements, ...this.formElements], 'disabled')
  }

  /**
   * If `true` the element can not mutated, meaning the user can not edit the control.
   */
  @Prop() readonly?: boolean = undefined

  @Watch('readonly')
  readonlyHandler() {
    this.updateProps([...this.inputElements, ...this.formElements], 'readonly')
  }

  /**
   * If `true` a loading spinner is visible at the end of the input
   */
  @Prop() loading?: boolean = undefined

  @Watch('loading')
  loadingHandler() {
    this.updateProps([...this.inputElements, ...this.formControlElement], 'loading')
  }

  connectedCallback() {
    this.mutationO = observeItems(this.el, undefined, () => this.triggerAllHandlers())
    this.triggerAllHandlers()
  }

  componentWillLoad() {
    this.triggerAllHandlers()
  }

  private triggerAllHandlers() {
    this.requiredHandler()
    this.invalidHandler()
    this.validHandler()
    this.readonlyHandler()
    this.disabledHandler()
    this.loadingHandler()
  }

  private updateProps(selectors: string[], key: string) {
    const value = (this as any)[key]
    if (value !== undefined) {
      this.notifyComponents<any>(selectors, input => (input[key] = value))
    }
  }

  private notifyComponents<T>(selectors: string[], callback: (component: T) => void) {
    const components = this.el.querySelectorAll<Element>(selectors.join(', '))
    components.forEach(c => callback(c as any))
  }

  render() {
    return (
      <Host
        class={{
          'bal-field': true,
          'field': true,
          'bal-field--invalid': this.invalid === true,
        }}
      >
        <slot></slot>
        <span class="hidden">{/* Empty slot element to keep the order of the children */}</span>
      </Host>
    )
  }
}
