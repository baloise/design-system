import { Component, h, Host, Method, Prop, State } from '@stencil/core'
import upperFirst from 'lodash.upperfirst'
import camelCase from 'lodash.camelcase'
import { BEM } from '../../utils/bem'
import {
  attachComponentToConfig,
  BalConfigObserver,
  BalConfigState,
  BalIcons,
  defaultConfig,
  detachComponentToConfig,
} from '../../utils/config'

@Component({
  tag: 'bal-icon',
  styleUrls: {
    css: 'bal-icon.sass',
  },
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
  @Prop() size: BalProps.BalIconSize = ''

  /**
   * The theme type of the button.
   */
  @Prop() color: BalProps.BalIconColor = ''

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

  /**
   * @internal define config for the component
   */
  @Method()
  async configChanged(state: BalConfigState): Promise<void> {
    this.icons = state.icons
  }

  private svgContent = (iconName: string) => {
    const hasIcons = Object.keys(this.icons).length > 0
    if (hasIcons && iconName && iconName.length > 0) {
      // We are doing this to avoid breaking change.
      if (iconName.startsWith('alert')) {
        iconName = 'alert-triangle'
      }
      if (iconName.startsWith('info')) {
        iconName = 'info-circle'
      }
      const icon: string | undefined = this.icons[`balIcon${upperFirst(camelCase(iconName))}`]
      if (icon) {
        return icon
      }
    }

    return this.svg || ''
  }

  render() {
    const color = [
      'white',
      'blue',
      'grey',
      'danger',
      'warning',
      'success',
      'grey-light',
      'primary',
      'primary-light',
    ].includes(this.color)
      ? this.color
      : 'primary'

    const block = BEM.block('icon')
    const svgContent = this.svgContent(this.name)

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
            ...block.element('inner').modifier(`turn-${this.name}`).class(this.turn),
            ...block.modifier(`is-${this.size}`).class(!!this.size),
          }}
          innerHTML={svgContent}
        ></div>
      </Host>
    )
  }
}
