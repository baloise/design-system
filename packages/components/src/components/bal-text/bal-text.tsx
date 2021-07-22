import { Component, h, Host, Prop } from '@stencil/core'
import { ColorTypes } from '../../types/color.types'

@Component({
  tag: 'bal-text',
  styleUrl: 'bal-text.scss',
  shadow: false,
  scoped: false,
})
export class Text {
  /**
   * If `true` the text has a small size
   */
  @Prop() small = false

  /**
   * If `true` the text is bold
   */
  @Prop() bold = false

  /**
   * Defines the color of the text.
   */
  @Prop() color: ColorTypes | '' = ''

  render() {
    return (
      <Host
        class={{
          [`has-text-${this.color}`]: this.color !== '',
          'is-small': this.small,
          'is-bold': this.bold,
        }}
      >
        <span>
          <slot></slot>
        </span>
      </Host>
    )
  }
}
