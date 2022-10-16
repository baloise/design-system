import { Component, h, Host, Prop, State } from '@stencil/core'
import upperFirst from 'lodash.upperfirst'
import camelCase from 'lodash.camelcase'
import { BalConfigObserver, Props } from '../../types'
import { BEM } from '../../utils/bem'
import { attachComponentToConfig, BalConfigState, BalIcons, defaultConfig, detachComponentToConfig } from '../../config'

@Component({
  tag: 'bal-icon',
})
export class Icon implements BalConfigObserver {
  @State() icons: BalIcons = defaultConfig.icons

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
  @Prop() color: Props.BalIconColor = ''

  /**
   * If `true` the icon has display inline style
   */
  @Prop() inline = false

  /**
   * If `true` the icon is inverted
   */
  @Prop() inverted = false

  /**
   * If `true` the icon is rotated 180deg
   */
  @Prop() turn = false

  /**
   * If `true` adds a box shadow to improve readability on image background
   * */
  @Prop() shadow = false

  connectedCallback() {
    attachComponentToConfig(this)
  }

  disconnectedCallback() {
    detachComponentToConfig(this)
  }

  configChanged(state: BalConfigState): void {
    this.icons = state.icons
  }

  private get svgContent() {
    const hasIcons = Object.keys(this.icons).length > 0
    if (hasIcons && this.name && this.name.length > 0) {
      // We are doing this to avoid breaking change.
      if (this.name.startsWith('alert')) {
        this.name = 'alert-triangle'
      }
      if (this.name.startsWith('info')) {
        this.name = 'info-circle'
      }
      const icon: string | undefined = this.icons[`balIcon${upperFirst(camelCase(this.name))}`]
      if (icon) {
        return icon
      }
    }

    return this.svg || ''
  }

  render() {
    const color = ['white', 'blue', 'grey', 'danger', 'warning', 'success', 'grey-light'].includes(this.color)
      ? this.color
      : 'blue'

    const block = BEM.block('icon')

    return (
      <Host
        class={{
          ...block.class(),
          ...block.modifier('is-inverted').class(this.inverted),
          ...block.modifier('is-inline').class(this.inline),
          ...block.modifier('shadow').class(this.shadow),
          ...block.modifier(`is-${this.size}`).class(!!this.size),
          ...block.modifier(`is-${color}`).class(),
        }}
      >
        <div
          class={{
            ...block.element('inner').class(),
            ...block.element('inner').modifier('turn').class(this.turn),
            ...block.modifier(`is-${this.size}`).class(!!this.size),
          }}
          innerHTML={this.svgContent}
        ></div>
      </Host>
    )
  }
}
