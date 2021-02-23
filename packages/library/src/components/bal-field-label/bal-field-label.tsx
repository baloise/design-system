import { Component, h, Host, Prop } from '@stencil/core'

@Component({
  tag: 'bal-field-label',
  shadow: false,
  scoped: true,
})
export class FieldLabel {
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
        <label>
          <bal-text small>
            {this.text}
            {this.required === true ? ' *' : ''}
          </bal-text>
          <slot></slot>
        </label>
      </Host>
    )
  }
}
