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
  detachComponentFromConfig,
} from '../../utils/config'
import { BalElementStateInfo } from '../../utils/element-states'
import { ListenToConfig } from '../../utils/config/config.decorator'

@Component({
  tag: 'bal-icon',
  styleUrls: {
    css: 'bal-icon.sass',
  },
})
export class Icon implements BalConfigObserver, BalElementStateInfo {
  @State() icons: BalIcons = defaultConfig.icons

  /**
   * PUBLIC API
   * ------------------------------------------------------
   */

  /**
   * Name of the baloise icon.
   */
  @Prop({ reflect: true, mutable: true }) name = ''

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

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop() disabled?: boolean = undefined

  /**
   * If `true` the component gets a invalid red style.
   */
  @Prop() invalid?: boolean = undefined

  /**
   * @internal
   */
  @Prop() hovered = false

  /**
   * @internal
   */
  @Prop() pressed = false

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  /**
   * @internal define config for the component
   */
  @Method()
  @ListenToConfig()
  async configChanged(state: BalConfigState): Promise<void> {
    this.icons = state.icons
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

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

  private parseColor() {
    if (!!this.disabled) {
      return 'grey'
    }

    if (!!this.invalid) {
      if (this.pressed) {
        return 'danger-darker'
      } else if (this.hovered) {
        return 'danger-dark'
      } else {
        return 'danger'
      }
    }

    if (this.color !== 'auto') {
      if (this.pressed) {
        return 'primary-dark'
      } else if (this.hovered) {
        return 'light-blue'
      }
    }

    return [
      'auto',
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
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const color = this.parseColor()
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
