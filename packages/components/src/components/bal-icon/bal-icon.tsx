import { Component, h, Host, Method, Prop, State } from '@stencil/core'
import upperFirst from 'lodash.upperfirst'
import camelCase from 'lodash.camelcase'
import { BalConfigObserver, Props } from '../../types'
import { BEM } from '../../utils/bem'
import {
  attachComponentToConfig,
  BalConfigState,
  BalIcons,
  defaultConfig,
  detachComponentToConfig,
} from '../../utils/config'
import { ComponentElementState } from '../../utils/element-states'

@Component({
  tag: 'bal-icon',
  styleUrls: {
    css: 'bal-icon.sass',
  },
})
export class Icon implements BalConfigObserver, ComponentElementState {
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
  @Prop() size: Props.BalIconSize = ''

  /**
   * The theme type of the button.
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
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    attachComponentToConfig(this)
  }

  disconnectedCallback() {
    detachComponentToConfig(this)
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  /**
   * @internal define config for the component
   */
  @Method()
  async configChanged(state: BalConfigState): Promise<void> {
    this.icons = state.icons
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

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
          innerHTML={this.svgContent}
        ></div>
      </Host>
    )
  }
}
