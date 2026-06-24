import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import camelCase from 'lodash/camelCase'
import upperFirst from 'lodash/upperFirst'
import {
  sanitizeSvg,
  fetchSvg,
  normalizeDeprecatedTShirtSize,
  Logger,
  type LogInstance,
  hasValue,
  OneOf,
  Type,
} from '@utils'
import { DsComponentInterface } from '@global'
import { DsConfigObserver, DsConfigState, DsIcons, defaultConfig, ListenToConfig } from '@global'
import {
  ICON_SHAPES,
  ICON_COLORS,
  ICON_TILE_COLORS,
  ICON_SIZES,
  type IconShape,
  type IconColor,
  type IconTileColor,
  type IconSize,
} from './icon.interfaces'

/**
 * Icon displays SVG icons with customizable color, size, rotation, and optional tile background.
 *
 * @part icon - The SVG icon element wrapper.
 */
@Component({
  tag: 'ds-icon',
  styleUrl: 'icon.host.scss',
  shadow: true,
})
export class Icon implements DsComponentInterface, DsConfigObserver {
  log!: LogInstance

  @Logger('icon')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  private _fetchedSrc = ''

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
  @Type('string')
  readonly name: string = ''

  /**
   * Svg content.
   */
  @Prop()
  @Type('string')
  readonly svg: string = ''

  /**
   * URL of an SVG file to fetch and display.
   */
  @Prop()
  @Type('string')
  readonly src: string = ''

  /**
   * Defines the size of the icon.
   */
  @Prop({ reflect: true, mutable: true })
  @OneOf(ICON_SIZES)
  size: IconSize
  @Watch('size')
  sizeChanged(newValue: IconSize) {
    this.size = normalizeDeprecatedTShirtSize(newValue)
  }

  /**
   * The theme type of the button.
   */
  @Prop()
  @OneOf(ICON_COLORS)
  readonly color?: IconColor

  /**
   * If `true` the icon is displayed in a circle with a background color.
   */
  @Prop()
  @OneOf(ICON_SHAPES)
  readonly shape: IconShape = ''

  /**
   * If `true` the icon acts as a tile with a background color.
   */
  @Prop()
  @Type('boolean')
  readonly tile: boolean = false

  /**
   * If `true` the icon acts as a tile with a background color. Default is purple
   */
  @Prop()
  @OneOf(ICON_TILE_COLORS)
  readonly tileColor: IconTileColor = 'purple'

  /**
   * If `true` the icon has display inline style
   */
  @Prop()
  @Type('boolean')
  readonly inline: boolean = false

  /**
   * If `true` the icon is inverted
   */
  @Prop()
  @Type('boolean')
  readonly inverted: boolean = false

  /**
   * If `true` the icon is rotated 180deg
   */
  @Prop()
  @Type('boolean')
  readonly turn: boolean = false

  /**
   * If `true` adds a box shadow to improve readability on image background
   * */
  @Prop()
  @Type('boolean')
  readonly shadow: boolean = false

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop()
  @Type('boolean')
  readonly disabled: boolean = false

  /**
   * If `true` the component gets a invalid red style.
   */
  @Prop()
  @Type('boolean')
  readonly invalid: boolean = false

  /**
   * LIFE CYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    // generateSvgContent is async; for src-based icons the first render shows nothing
    // while the fetch is in flight. The @State update triggers a follow-up render.
    this.generateSvgContent(this.name)
    this.size = normalizeDeprecatedTShirtSize(this.size) || ''
  }

  async componentWillRender(): Promise<void> {
    await this.generateSvgContent(this.name)
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
    await this.generateSvgContent(this.name)
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private generateSvgContent = async (iconName: string | undefined) => {
    const hasIcons = Object.keys(this.icons).length > 0

    if (hasIcons && iconName && iconName.length > 0) {
      const icon: string | undefined = this.icons[`Icon${upperFirst(camelCase(iconName))}`]
      if (icon) {
        if (icon !== this.svgContent) {
          this.svgContent = icon
        }
        return
      } else {
        console.error(
          `Icon "${iconName}" not found in design system configuration.`,
          '\n\nCheck out the documentation on how to import icons during initialization.',
          '\nhttps://design.baloise.dev/?path=/docs/components-data-display-icon--documentation&globals=framework:angular#import-during-initialization',
        )
      }
    }

    if (this.src && this.src !== this._fetchedSrc) {
      this._fetchedSrc = this.src
      this.svgContent = await fetchSvg(this.src)
      return
    }

    if (this.svg) {
      const sanitized = sanitizeSvg(this.svg)
      if (sanitized !== this.svgContent) {
        this.svgContent = sanitized
      }
    }
  }

  private parseColor() {
    if (this.disabled) {
      return 'grey'
    }

    if (this.invalid) {
      return 'danger'
    }

    if (!hasValue(this.color) && !this.svg && !this.src) {
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
          'is-filled': !this.svg && !this.src,
          [`is-${color}`]: hasValue(color),
          [`is-${this.size}`]: hasValue(this.size),
          [`turn-${this.name}`]: this.turn,
          'is-inverted': this.inverted,
          'is-inline': this.inline,
          'is-tile': this.tile,
          [`is-tile-${this.tileColor}`]: this.tile,
          'has-shadow': this.shadow,
          'is-disabled': this.disabled,
          'is-invalid': this.invalid,
          [`has-shape-${this.shape}`]: hasValue(this.shape),
        }}
      >
        <div id="inner" part="inner" innerHTML={this.svgContent}></div>
      </Host>
    )
  }
}
