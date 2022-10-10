import { Component, h, ComponentInterface, Host, Element, Prop } from '@stencil/core'
import { inheritAttributes } from '../../helpers/helpers'
import { Props } from '../../types'
import { BEM } from '../../utils/bem'

@Component({
  tag: 'bal-close',
})
export class Close implements ComponentInterface {
  @Element() el!: HTMLElement

  private inheritedAttributes: { [k: string]: any } = {}

  /**
   * Define the size of badge. Small is recommended for tabs.
   */
  @Prop() size: Props.BalCloseSize = ''

  /**
   * If `true` it supports dark backgrounds.
   */
  @Prop() inverted = false

  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.el, ['tabindex'])
  }

  render() {
    const blockEl = BEM.block('close')
    const buttonEl = blockEl.element('button')
    const iconEl = buttonEl.element('icon')

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
          {...this.inheritedAttributes}
        >
          <bal-icon
            name="close"
            size={this.size === 'small' ? 'xsmall' : this.size === 'medium' ? 'medium' : 'small'}
            inverted={this.inverted}
            class={{
              ...iconEl.class(),
            }}
          ></bal-icon>
        </button>
      </Host>
    )
  }
}
