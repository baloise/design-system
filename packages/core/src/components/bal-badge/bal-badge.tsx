import { Component, ComponentInterface, Element, h, Host, Prop } from '@stencil/core'
import { BEM } from '../../utils/bem'

@Component({
  tag: 'bal-badge',
  styleUrl: 'bal-badge.sass',
})
export class Badge implements ComponentInterface {
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
   * Define the color for the badge.
   */
  @Prop() color: BalProps.BalBadgeColor = ''

  /**
   * If `true` the badge is added to the top right corner of the card.
   */
  @Prop() position: BalProps.BalBadgePosition = ''

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
          <slot />
        </span>
        {this.size !== 'small' ? (
          <bal-icon
            class={{
              ...iconEl.class(),
              ...iconEl.modifier(`hidden`).class(!labelHidden),
            }}
            size={this.size === '' ? 'small' : ''}
            name={this.icon}
            color={this.color === 'grey' ? 'grey' : 'primary'}
          ></bal-icon>
        ) : (
          ''
        )}
      </Host>
    )
  }
}
