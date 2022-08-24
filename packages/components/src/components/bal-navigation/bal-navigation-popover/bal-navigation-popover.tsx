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

  /**
   * Defines border-radius of popover content.
   */
  @Prop() contentRadius: Props.BalPopoverContentRadius = 'normal'

  /**
   * Define the position of the popover content.
   */
  @Prop() position: Props.BalPopoverPlacement = 'bottom-start'

  /**
   * Define the max width of the popover content.
   */
  @Prop() contentWidth = 0

  /**
   * Define the min width of the popover content.
   */
  @Prop() contentMinWidth = 0

  /**
   * Define the offset of the popover content.
   */
  @Prop() offsetY = 0

  /**
   * If `true` the width of the buttons is limited
   */
  @Prop() square = false

  /**
   * If `true` the popover does not have the shadow
   */
  @Prop() contentNoShadow = false

  /**
   * If `true` the content has a min width of 100%.
   */
  @Prop() contentExpanded = false

  /**
   * If `true` a little arrow is added, which points to the trigger element
   */
  @Prop() arrow = false

  render() {
    return (
      <Host>
        <bal-popover
          value={this.isActive}
          onBalChange={event => (this.isActive = event.detail)}
          arrow={this.arrow}
          backdrop={this.backdrop}
          position={this.position}
          offsetY={this.offsetY}
        >
          <bal-button
            bal-popover-trigger
            icon={this.icon}
            size={this.size}
            inverted={this.inverted}
            color={this.isActive ? this.activeColor : this.inactiveColor}
            square={this.square}
            onClick={() => (this.isActive = !this.isActive)}
            aria-haspopup="true"
          >
            {this.label}
          </bal-button>
          <bal-popover-content
            radius={this.contentRadius}
            content-width={this.contentWidth}
            content-min-width={this.contentMinWidth}
            no-shadow={this.contentNoShadow}
            expanded={this.contentExpanded}
          >
            <slot></slot>
          </bal-popover-content>
        </bal-popover>
      </Host>
    )
  }
}
