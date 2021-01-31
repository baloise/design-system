import { Component, h, Host, Prop, Element } from '@stencil/core'

@Component({
  tag: 'bal-field-label',
  shadow: false,
  scoped: true,
})
export class FieldLabel {
  @Element() element: HTMLElement

  /**
   * Text of the inputs label
   */
  @Prop() text: string = ''

  /**
   * If `true` a asterix (*) is added to the label text
   */
  @Prop() required: boolean = false

  render() {
    return (
      <Host class="label">
        <label htmlFor={this.findInputId()}>
          <bal-text small>
            {this.text}
            {this.required === true ? ' *' : ''}
          </bal-text>
          <slot></slot>
        </label>
      </Host>
    )
  }

  private findInputId(): string {
    const inputElement = this.element.querySelector('input.input')
    return inputElement && inputElement.id ? inputElement.id : ''
  }
}
