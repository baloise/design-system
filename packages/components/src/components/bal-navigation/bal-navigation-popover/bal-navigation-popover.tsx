import { Component, h, ComponentInterface, Host, Prop, State } from '@stencil/core'
import { Props } from '../../../types'

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

  render() {
    return (
      <Host>
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
            <slot></slot>
          </bal-popover-content>
        </bal-popover>
      </Host>
    )
  }
}
