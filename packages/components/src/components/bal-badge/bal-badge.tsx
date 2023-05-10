import { Component, h, ComponentInterface, Host, Element, Prop } from '@stencil/core'
import { BEM } from '../../utils-new/bem'
import { BalBreakpointObserver, BalBreakpoints, balBreakpointSubject } from '../../utils-new/breakpoints'
import { ListenToBreakpoints } from '../../utils-new/breakpoints/breakpoint.decorator'

@Component({
  tag: 'bal-badge',
  styleUrls: {
    css: 'bal-badge.sass',
  },
})
export class Badge implements ComponentInterface, BalBreakpointObserver {
  @ListenToBreakpoints()
  breakpointListener(breakpoints: BalBreakpoints): void {
    console.log('breakpointChanged', breakpoints)
  }

  @Element() el!: HTMLElement

  /**
   * Name of the icon to show. If a icon is present text should be hidden.
   */
  @Prop() icon?: string

  /**
   * Define the size of badge. Small is recommended for tabs.
   */
  @Prop() size: BalProps.BalBadgeSize = ''

  /**
   * Define the alert color for the badge.
   */
  @Prop() color: BalProps.BalBadgeColor = ''

  /**
   * If `true` the badge is added to the top right corner of the card.
   */
  @Prop() position: BalProps.BalBadgePosition = ''

  // connectedCallback(): void {
  //   balBreakpointSubject.connect(this)
  // }

  render() {
    const block = BEM.block('badge')
    const labelEl = block.element('label')
    const iconEl = block.element('icon')
    const color = this.color !== ''
    const size = this.size !== ''
    const position = this.position !== ''
    const labelHidden = !!this.icon || this.size === 'small'

    return (
      <Host
        class={{
          ...block.class(),
          ...block.modifier(`background-${this.color}`).class(color),
          ...block.modifier(`position-${this.position}`).class(position),
          ...block.modifier(`size-${this.size}`).class(size),
        }}
      >
        <span
          class={{
            ...labelEl.class(),
            ...labelEl.modifier(`color-${this.color}`).class(color),
            ...labelEl.modifier(`hidden`).class(labelHidden),
          }}
          data-testid="bal-badge-label"
        >
          <slot></slot>
        </span>
        <bal-icon
          class={{
            ...iconEl.class(),
            ...iconEl.modifier(`hidden`).class(!labelHidden),
          }}
          size={this.size === '' ? 'small' : ''}
          name={this.icon}
          color={this.color === 'grey' ? 'grey' : 'primary'}
        ></bal-icon>
      </Host>
    )
  }
}
