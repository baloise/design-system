import { Component, h, Host, Prop } from '@stencil/core'

@Component({
  tag: 'bal-field-label',
  shadow: false,
  scoped: true,
})
export class FieldLabel {
  /**
   * If `true` a asterix (*) is added to the label text
   */
  @Prop() required: boolean = false

  render() {
    return (
      <Host>
        <label class="label">
          <slot></slot>
          {this.required === true ? ' *' : ''}
        </label>
      </Host>
    )
  }
}
