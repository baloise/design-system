import { Component, h, ComponentInterface, Host, Element, Prop } from '@stencil/core'

@Component({
  tag: 'bal-close',
})
export class Close implements ComponentInterface {
  @Element() el!: HTMLElement

  /**
   * Define the size of badge. Small is recommended for tabs.
   */
  @Prop() size: 'small' | 'large' | 'medium' | '' = ''

  /**
   * If `true` it supports dark backgrounds.
   */
  @Prop() inverted = false

  /**
   * If `true` it has a light background.
   */
  @Prop() background = false

  render() {
    return (
      <Host>
        <button
          tabIndex={-1}
          aria-label="close"
          class={{
            'delete': true,
            'is-inverted': this.inverted,
            'has-background': this.background,
            [`is-${this.size}`]: this.size !== '',
          }}
        ></button>
      </Host>
    )
  }
}
