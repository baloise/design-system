import { Component, Host, h, Prop, Watch } from '@stencil/core'
import { Props } from '../../types'
import { BEM } from '../../utils/bem'

@Component({
  tag: 'bal-list',
})
export class List {
  /**
   * If `true` the list item can not be hovered
   */
  @Prop() disabled = false

  /**
   * @deprecated
   * If `true` the list can be used on a dark background
   */
  @Prop() inverted = false
  @Watch('inverted')
  invertedHandler() {
    console.warn('[DEPRECATED] - Please use the property background="dark" instead')
    if (this.inverted === true) {
      this.background = 'dark'
    }
  }

  /**
   * If `true` the list can be used on a light, dark or colored backgrounds
   */
  @Prop() background: Props.BalListBackground = 'light'

  /**
   * If `true` each list item has a bottom border
   */
  @Prop() border = false

  /**
   * Defines the min height of the list item
   */
  @Prop() size: Props.BalListSize = ''

  /**
   * If `true` the list can be used as an accordion in meta nav
   */
  @Prop() inMainNav = false

  render() {
    const block = BEM.block('list')

    return (
      <Host
        role="list"
        class={{
          ...block.class(),
          ...block.modifier('context-main-nav').class(this.inMainNav),
          ...block.modifier('disabled').class(this.disabled),
          ...block.modifier('border').class(this.border),
          ...block.modifier(`size-${this.size}`).class(this.size !== ''),
          ...block.modifier(`background-${this.background}`).class(),
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}
