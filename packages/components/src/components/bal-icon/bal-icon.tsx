import { Component, h, Host, Prop } from '@stencil/core'
import * as balIcons from '@baloise/design-system-icons'
import upperFirst from 'lodash.upperfirst'
import camelCase from 'lodash.camelcase'
import { Props } from '../../types'

@Component({
  tag: 'bal-icon',
})
export class Icon {
  /**
   * Name of the baloise icon.
   */
  @Prop({ reflect: true }) name = ''

  /**
   * Svg content.
   */
  @Prop() svg = ''

  /**
   * Defines the size of the icon.
   */
  @Prop() size: Props.BalIconSize = ''

  /**
   * The theme type of the button. Given by bulma our css framework.
   */
  @Prop() color: Props.BalIconColor = 'info'

  /**
   * If `true` the icon has display inline style
   */
  @Prop() inline = false

  /**
   * If `true` the icon is inverted
   */
  @Prop() inverted = false

  /**
   * If `true` the icon rotates like for a loading spinner
   */
  @Prop() rotate = false

  /**
   * If `true` the icon is rotated 180deg
   */
  @Prop() turn = false

  private get svgContent() {
    if (balIcons && this.name && this.name.length > 0) {
      const icon: string | undefined = (balIcons as { [key: string]: string })[
        `balIcon${upperFirst(camelCase(this.name))}`
      ]
      if (icon) {
        return icon
      }
    }

    return this.svg || ''
  }

  render() {
    return (
      <Host
        class={{
          [`is-size-${this.size}`]: !!this.size,
          [`is-inverted`]: this.inverted,
          [`is-${this.color}`]: true,
          [`turn`]: this.turn,
          [`rotate`]: this.rotate,
          [`is-inline`]: this.inline,
        }}
      >
        <div class="bal-icon-inner" innerHTML={this.svgContent}></div>
      </Host>
    )
  }
}
