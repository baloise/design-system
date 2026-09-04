import { Component, Element, h, Host, Prop, State } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { sanitizeSvg, fetchSvg, Logger, type LogInstance, hasValue, OneOf, Type } from '@utils'
import { DsComponentInterface } from '@global'
import { type IconColor, type IconSize, BRAND_ICON_SIZES, BRAND_ICON_COLORS } from './brand-icon.interfaces'

/**
 * Icon displays SVG icons with customizable color, size, rotation, and optional tile background.
 *
 * @part inner - The SVG icon element wrapper.
 */
@Component({
  tag: 'ds-brand-icon',
  styleUrl: 'brand-icon.host.scss',
  shadow: true,
})
export class BrandIcon implements DsComponentInterface {
  log!: LogInstance

  @Logger('brand-icon')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  private _fetchedSrc = ''

  @State() svgContent = ''

  /**
   * PUBLIC PROPERTY API
   * ─────────────────────────────────────────────────────
   */

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
  @Prop({ reflect: true })
  @OneOf(BRAND_ICON_SIZES)
  readonly size?: IconSize

  /**
   * The color variant of the icon.
   */
  @Prop()
  @OneOf(BRAND_ICON_COLORS)
  readonly color?: IconColor

  /**
   * If `true` the icon acts as a tile with a background color.
   */
  @Prop()
  @Type('boolean')
  readonly tile: boolean = false

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
   * LIFECYCLE
   * ─────────────────────────────────────────────────────
   */

  connectedCallback() {
    this.generateSvgContent()
  }

  async componentWillRender(): Promise<void> {
    await this.generateSvgContent()
  }

  /**
   * PRIVATE METHODS
   * ─────────────────────────────────────────────────────
   */

  private generateSvgContent = async () => {
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

  /**
   * RENDER
   * ─────────────────────────────────────────────────────
   */

  render() {
    return (
      <Host
        aria-hidden="true"
        class={{
          [`is-${this.color}`]: hasValue(this.color),
          [`is-${this.size}`]: hasValue(this.size),
          'is-tile': this.tile,
          'is-disabled': this.disabled,
          'is-invalid': this.invalid,
        }}
      >
        <div id="inner" part="inner" innerHTML={this.svgContent}></div>
      </Host>
    )
  }
}
