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

  /**
   * Text for the close button.
   */
  @Prop() closeLabel = 'Close'

  /**
   * Disables the close button for tablet and desktop
   */
  @Prop() small = false

  render() {
    return (
      <Host>
        <bal-hint closeLabel={this.closeLabel} small={this.small}>
          <bal-hint-title>{this.subject}</bal-hint-title>
          <bal-hint-text>
            <slot></slot>
          </bal-hint-text>
        </bal-hint>
      </Host>
    )
  }
}
