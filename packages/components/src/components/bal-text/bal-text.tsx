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
   * The theme type of the toast. Given by bulma our css framework.
   */
  @Prop() color: ColorTypes | '' = ''

  render() {
    return (
      <Host
        class={{
          [`has-text-${this.color}`]: this.color !== '',
          'is-small': this.small,
        }}
      >
        <slot />
      </Host>
    )
  }
}
