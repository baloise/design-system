import { Component, ComponentInterface, h, Host, Method, Prop, State, Watch } from '@stencil/core'
import camelCase from 'lodash/camelCase'
import upperFirst from 'lodash/upperFirst'
import {
  sanitizeSvg,
  normalizeDeprecatedTShirtSize,
  Loggable,
  Logger,
  type LogInstance,
  ValidateEmptyOrOneOf,
  ValidateEmptyOrType,
  setupValidation,
} from '@utils'
import { DsConfigObserver, DsConfigState, DsIcons, defaultConfig, ListenToConfig } from '@global'

@Component({
  tag: 'ds-icon',
  styleUrl: 'icon.host.scss',
  shadow: true,
})
export class Icon implements DsConfigObserver, ComponentInterface, Loggable {
  log!: LogInstance

  @Logger('icon')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @State() icons: DsIcons = defaultConfig.icons
  @State() svgContent = ''

  /**
   * PUBLIC API
   * ------------------------------------------------------
   */

  /**
   * Name of the baloise icon.
   */
  @Prop({ reflect: true })
  @ValidateEmptyOrType('string')
  readonly name?: string

  /**
   * Svg content.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly svg?: string

  /**
   * Defines the size of the icon.
   */
  @Prop({ reflect: true, mutable: true })
  @ValidateEmptyOrOneOf(
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    '2xl',
    'xsmall',
    'x-small',
    'small',
    'medium',
    'large',
    'x-large',
    'xx-large',
    '',
  )
  size: DS.IconSize
  @Watch('size')
  sizeChanged(newValue: DS.IconSize) {
    this.size = normalizeDeprecatedTShirtSize(newValue) || undefined
  }

  /**
   * The theme type of the button.
   */
  @Prop()
  @ValidateEmptyOrOneOf(
    'blue',
    'light-blue',
    'success',
    'success-dark',
    'success-darker',
    'danger',
    'danger-dark',
    'danger-darker',
    'warning',
    'warning-dark',
    'warning-darker',
    'white',
    'grey',
    'grey-light',
    'grey-dark',
    'primary',
    'primary-light',
    'primary-dark',
    '',
  )
  readonly color?: DS.IconColor

  /**
   * If `true` the icon is displayed in a circle with a background color.
   */
  @Prop()
  @ValidateEmptyOrOneOf('triangle', 'circle', '')
  readonly shape?: DS.IconShape

  /**
   * If `true` the icon acts as a tile with a background color.
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly tile: boolean = false

  /**
   * If `true` the icon acts as a tile with a background color. Default is purple
   */
  @Prop()
  @ValidateEmptyOrOneOf('purple', 'red', 'yellow', 'green')
  readonly tileColor: DS.IconTileColor = 'purple'

  /**
   * If `true` the icon has display inline style
   */
  @Prop() readonly inline: boolean = false

  /**
   * If `true` the icon is inverted
   */
  @Prop() readonly inverted: boolean = false

  /**
   * If `true` the icon is rotated 180deg
   */
  @Prop() readonly turn: boolean = false

  /**
   * If `true` adds a box shadow to improve readability on image background
   * */
  @Prop() readonly shadow: boolean = false

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop() readonly disabled: boolean = false

  /**
   * If `true` the component gets a invalid red style.
   */
  @Prop() readonly invalid: boolean = false

  /**
   * LIFE CYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    setupValidation(this)
    this.generateSvgContent(this.name)
    this.size = normalizeDeprecatedTShirtSize(this.size) || ''
  }

  componentWillRender(): Promise<void> | void {
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
  async configChanged(state: DsConfigState): Promise<void> {
    this.icons = state.icons
    this.generateSvgContent(this.name)
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private generateSvgContent = (iconName: string | undefined) => {
    const hasIcons = Object.keys(this.icons).length > 0

    if (hasIcons && iconName && iconName.length > 0) {
      const icon: string | undefined = this.icons[`Icon${upperFirst(camelCase(iconName))}`]
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

    if (this.svg) {
      this.svgContent = sanitizeSvg(this.svg)
    }
  }

  private parseColor() {
    if (!!this.disabled) {
      return 'grey'
    }

    if (!!this.invalid) {
      return 'danger'
    }

    if ((this.color === 'auto' || this.color === '' || this.color === undefined || this.color === null) && !this.svg) {
      return 'primary'
    }

    return this.color
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const color = this.parseColor()

    return (
      <Host
        aria-hidden="true"
        class={{
          'is-filled': !this.svg,
          [`is-${color}`]: !!color,
          [`is-${this.size}`]: this.size !== undefined,
          [`turn-${this.name}`]: this.turn,
          'is-inverted': this.inverted,
          'is-inline': this.inline,
          'is-tile': this.tile,
          [`is-tile-${this.tileColor}`]: this.tile,
          'has-shadow': this.shadow,
          'is-disabled': this.disabled,
          'is-invalid': this.invalid,
          [`has-shape-${this.shape}`]: !!this.shape,
        }}
      >
        <div id="inner" part="inner" innerHTML={this.svgContent}></div>
      </Host>
    )
  }
}
