import { Component, ComponentInterface, h, Host, Method, Prop, State, Watch } from '@stencil/core'
import camelCase from 'lodash.camelcase'
import upperFirst from 'lodash.upperfirst'
import { BEM } from '../../utils/bem'
import { BalConfigObserver, BalConfigState, BalIcons, defaultConfig, ListenToConfig } from '../../utils/config'
import { BalElementStateInfo } from '../../utils/element-states'
import { sanitizeSvg } from '../../utils/svg'

@Component({
  tag: 'bal-icon',
  styleUrl: 'bal-icon.sass',
})
export class Icon implements BalConfigObserver, BalElementStateInfo, ComponentInterface {
  @State() icons: BalIcons = defaultConfig.icons
  @State() svgContent = ''
  @State() innerColor = ''
  @State() innerSize = ''

  /**
   * PUBLIC API
   * ------------------------------------------------------
   */

  /**
   * Name of the baloise icon.
   */
  @Prop({ reflect: true, mutable: true }) name = ''
  @Watch('name')
  nameChanged() {
    this.generateSvgContent(this.name)
  }

  /**
   * Svg content.
   */
  @Prop() svg = ''
  @Watch('svg')
  svgChanged() {
    this.generateSvgContent(this.name)
  }

  /**
   * Defines the size of the icon.
   */
  @Prop() size: BalProps.BalIconSize = ''

  /**
   * The theme type of the button.
   */
  @Prop() color: BalProps.BalIconColor = ''
  @Prop() colorHovered: BalProps.BalIconColor = ''
  @Prop() colorPressed: BalProps.BalIconColor = ''

  /**
   * If `true` the icon acts as a tile with a background color.
   */
  @Prop() tile = false

  /**
   * If `true` the icon acts as a tile with a background color. Default is purple
   */
  @Prop() tileColor: BalProps.BalIconTileColor = ''

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
   * LIFE CYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    this.generateSvgContent(this.name)
  }

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
    this.generateSvgContent(this.name)
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private generateSvgContent = (iconName: string) => {
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
        this.svgContent = icon
        return
      } else {
        console.error(
          `Icon "${iconName}" not found in design system configuration.`,
          '\n\nCheck out the documentation on how to import icons during initialization.',
          '\nhttps://design.baloise.dev/?path=/docs/components-data-display-icon--documentation&globals=framework:angular#import-during-initialization',
        )
      }
    }

    this.svgContent = sanitizeSvg(this.svg)
  }

  private parseColor() {
    if (this.colorHovered && this.hovered) {
      return this.colorHovered
    }
    if (this.colorPressed && this.pressed) {
      return this.colorPressed
    }
    if (this.colorHovered && this.colorPressed) {
      return this.color
    }

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

    if (this.color !== 'auto' && (this.color === 'primary' || this.color === '')) {
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
      'grey-light',
      'grey-dark',
      'danger',
      'danger-dark',
      'danger-darker',
      'warning',
      'warning-dark',
      'warning-darker',
      'success',
      'success-dark',
      'success-darker',
      'primary',
      'primary-light',
      'light-blue',
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
        aria-hidden="true"
        class={{
          ...block.class(),
          ...block.modifier('tile').class(this.tile),
          ...block.modifier(`tile-color-${this.tileColor}`).class(this.tile && !!this.tileColor),
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
            ...block.element('inner').modifier('tile').class(this.tile),
            ...block.modifier(`is-${this.size}`).class(!!this.size),
          }}
          innerHTML={this.svgContent}
        ></div>
      </Host>
    )
  }
}
