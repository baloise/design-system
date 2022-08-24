import { Component, h, ComponentInterface, Host, Prop, State } from '@stencil/core'
import { Props } from '../../../types'
import { BEM } from '../../../utils/bem'

@Component({
  tag: 'bal-navigation-popover',
})
export class NavigationPopover implements ComponentInterface {
  @State() isActive = false

  /**
   * Defines the label of the button
   */
  @Prop() label = ''
  /**
   * Turns the trigger button to inverted style.
   */
  @Prop() inverted = false
  /**
   * Defines the icon of the trigger button.
   */
  @Prop() icon?: string

  /**
   * If `true` a backdrop is added
   */
  @Prop() backdrop = false

  /**
   * Defines the size of the button
   */
  @Prop() size: Props.BalButtonSize = ''

  /**
   * Color style of the button when the popover is closed.
   */
  @Prop() inactiveColor: Props.BalButtonColor = 'light'

  /**
   * Color style of the button when the popover is open.
   */
  @Prop() activeColor: Props.BalButtonColor = 'primary'

  /**
   * Defines the heading of the popover
   */
  @Prop() heading?: string

  /**
   * If 'false', the closing button is not displayed
   */
  @Prop() closable = true

  render() {
    const navPopoverEl = BEM.block('nav').element('popover')

    return (
      <Host
        class={{
          ...navPopoverEl.class(),
        }}
      >
        <bal-popover
          value={this.isActive}
          onBalChange={event => (this.isActive = event.detail)}
          arrow
          backdrop={this.backdrop}
        >
          <bal-button
            bal-popover-trigger
            icon={this.icon}
            size={this.size}
            inverted={this.inverted}
            color={this.isActive ? this.activeColor : this.inactiveColor}
            square={this.label === ''}
            onClick={() => (this.isActive = !this.isActive)}
          >
            {this.label}
          </bal-button>
          <bal-popover-content>
            {(this.closable || this.heading) && (
              <div
                class={{
                  ...navPopoverEl.element('head').class(),
                }}
              >
                {this.heading && (
                  <bal-heading space="none" level="h4">
                    {this.heading}
                  </bal-heading>
                )}
                {this.closable && <bal-close onClick={() => (this.isActive = !this.isActive)} />}
              </div>
            )}
            <slot></slot>
          </bal-popover-content>
        </bal-popover>
      </Host>
    )
  }
}
