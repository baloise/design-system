import { Component, h, ComponentInterface, Host, Element, Prop } from '@stencil/core'
import { Props } from '../../types'

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
    return (
      <Host class="bal-close">
        <button
          type="button"
          tabIndex={-1}
          aria-label="close"
          class={{
            // 'delete': true,
            'is-inverted': this.inverted,
            [`is-${this.size}`]: this.size !== '',
          }}
        ></button>
      </Host>
    )
  }
}
