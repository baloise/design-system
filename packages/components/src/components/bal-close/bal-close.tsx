import { Component, h, ComponentInterface, Host, Element, Prop } from '@stencil/core'
import { Props } from '../../types'
import { BEM } from '../../utils/bem'

@Component({
  tag: 'bal-close',
})
export class Close implements ComponentInterface {
  @Element() el!: HTMLElement

  /**
   * Define the size of badge. Small is recommended for tabs.
   */
  @Prop() size: Props.BalCloseSize = ''

  /**
   * If `true` it supports dark backgrounds.
   */
  @Prop() inverted = false

  render() {
    const blockEl = BEM.block('close')
    const buttonEl = blockEl.element('button')

    return (
      <Host class={{ ...blockEl.class() }}>
        <button
          type="button"
          aria-label="close"
          class={{
            ...buttonEl.class(),
            ...buttonEl.modifier('inverted').class(this.inverted),
            ...buttonEl.modifier(`size-${this.size}`).class(this.size !== ''),
          }}
        ></button>
      </Host>
    )
  }
}
