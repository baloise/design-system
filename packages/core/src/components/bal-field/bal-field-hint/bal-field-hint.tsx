import { Component, h, Host, Prop, State } from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { balBreakpoints } from '@baloise/ds-core'
import { BalBreakpoints, ListenToBreakpoints } from '../../../utils/breakpoints'

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

  /**
   * If `true` the hint box will close on an escape key and when clicking outside the hint box.
   */
  @Prop() backdropDismiss = false

  @State() isDesktop = balBreakpoints.isDesktop

  @ListenToBreakpoints()
  breakpointListener(breakpoints: BalBreakpoints): void {
    this.isDesktop = breakpoints.desktop
  }

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
          backdropDismiss={this.backdropDismiss}
        >
          {this.subject && !(this.hideTitleOnDesktop && this.isDesktop) ? (
            <bal-hint-title>{this.subject}</bal-hint-title>
          ) : (
            ''
          )}
          <bal-hint-text>
            <slot></slot>
          </bal-hint-text>
        </bal-hint>
      </Host>
    )
  }
}
