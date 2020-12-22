import { Component, h, Host, Prop, Element, Watch } from '@stencil/core'

@Component({
  tag: 'bal-field',
  styleUrl: 'bal-field.scss',
  shadow: false,
  scoped: true,
})
export class Field {
  @Element() element!: HTMLElement

  /**
   * Text of the inputs label
   */
  @Prop() label: string = ''

  /**
   * If `true` a asterix (*) is added to the label text
   */
  @Prop() required: boolean = false

  /**
   * If `true` the component takes the whole width
   */
  @Prop() expanded: boolean = false

  /**
   * If `true` the field loses opacity
   */
  @Prop() disabled: boolean = false

  /**
   * Validation message text
   */
  @Prop() validationMessage: string = ''

  /**
   * Baloise icon for the right side of the input
   */
  @Prop() iconRight: string = ''

  /**
   * Baloise icon for the left side of the input
   */
  @Prop() iconLeft: string = ''

  /**
   * If `true` the field can be used on blue background.
   */
  @Prop() inverted: boolean = false

  /**
   * If `true` a loading spinner is visible at the end of the input
   */
  @Prop() loading: boolean = false

  @Watch('inverted')
  @Watch('disabled')
  @Watch('expanded')
  watchHandler() {
    this.updateChildControl()
  }

  componentWillLoad() {
    this.updateChildControl()
  }

  updateChildControl() {
    const controls = this.element.querySelectorAll('bal-input, bal-select, bal-datepicker')
    controls.forEach((control: any) => {
      control.disabled = this.disabled
      control.inverted = this.inverted
      control.expanded = this.expanded
    })
  }

  get buildIconLeftTemplate() {
    if (this.iconLeft) {
      return <bal-icon name={this.iconLeft} isLeft={true} size="medium" />
    }
    return ''
  }

  get buildIconRightTemplate() {
    if (this.iconRight) {
      return <bal-icon name={this.iconRight} isRight={true} size="medium" />
    }
    return ''
  }

  render() {
    return (
      <Host
        class={{
          'is-expanded': this.expanded,
        }}>
        <div
          class={{
            'form': true,
            'is-inverted': this.inverted,
            'is-disabled': this.disabled,
          }}>
          <label class="label" htmlFor={this.findInputId()}>
            {this.label}
            {this.required === true ? ' *' : ''}
            <slot name="hint" />
          </label>
          <div
            class={{
              'control': true,
              'has-icons-left': !!this.iconLeft,
              'has-icons-right': !!this.iconRight,
              'is-loading': this.loading,
            }}>
            <slot></slot>
            {this.buildIconLeftTemplate}
            {this.buildIconRightTemplate}
          </div>
          <p class="help is-danger">{this.validationMessage}</p>
        </div>
      </Host>
    )
  }

  private findInputId(): string {
    const inputElement = this.element.querySelector('input.input')
    return inputElement && inputElement.id ? inputElement.id : ''
  }
}
