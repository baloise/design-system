import { Component, h, Host, Prop, State } from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { balBreakpoints } from '@baloise/ds-core'

@Component({
  tag: 'bal-field-hint',
  shadow: false,
  scoped: true,
})
export class FieldHint {
  /**
   * Hide the title on desktop.
   */
  @Prop() hideTitleOnDesktop = false
  /**
   * Text of the inputs label
   */
  @Prop() subject?: string = ''

  /**
   * Text for the close button.
   */
  @Prop() closeLabel = 'Close'

  /**
   * Disables the close button for tablet and desktop
   */
  @Prop() small = false

  @State() isDesktop = balBreakpoints.isDesktop

  render() {
    const block = BEM.block('field-hint')
    return (
      <Host
        class={{
          ...block.class(),
        }}
      >
        <bal-hint
          class={{
            ...block.element('hint').class(),
          }}
          data-testid="bal-field-hint"
          closeLabel={this.closeLabel}
          small={this.small}
        >
          {this.subject && !(this.hideTitleOnDesktop && this.isDesktop) ? <bal-hint-title>{this.subject}</bal-hint-title> : ''}
          <bal-hint-text>
            <slot></slot>
          </bal-hint-text>
        </bal-hint>
      </Host>
    )
  }
}
