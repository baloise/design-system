import { Component, h, Host, Prop } from '@stencil/core'

@Component({
  tag: 'bal-field-hint',
  shadow: false,
  scoped: true,
})
export class FieldHint {
  /**
   * Text of the inputs label
   */
  @Prop() subject = ''

  render() {
    return (
      <Host>
        <bal-hint>
          <bal-hint-title>{this.subject}</bal-hint-title>
          <bal-hint-text>
            <slot></slot>
          </bal-hint-text>
        </bal-hint>
      </Host>
    )
  }
}
