import { Element, Component, Host, Method, Prop, State, h } from '@stencil/core'
import { normalizeDeprecatedTShirtSize, Logger, type LogInstance, hasValue, OneOf, Type } from '@utils'
import {
  DsComponentInterface,
  DsConfigObserver,
  DsConfigState,
  DsLanguage,
  DsRegion,
  ListenToConfig,
  defaultConfig,
} from '@global'
import { i18nDsClose } from './close.i18n'
import { BUTTON_COLORS, ButtonColor } from '../button/button.interfaces'
import { CLOSE_BUTTON_SIZES, CLOSE_SIZES, CloseButtonSize, CloseSize } from './close.interfaces'
import { HTMLStencilElement } from '@stencil/core/internal'

/**
 * Close renders a button element for closing or dismissing UI components with customizable size and color.
 *
 * @part close - The close button element.
 */
@Component({
  tag: 'ds-close',
  styleUrl: 'close.host.scss',
  shadow: true,
})
export class Close implements DsComponentInterface, DsConfigObserver {
  log!: LogInstance

  @Logger('close')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  @State() language: DsLanguage = defaultConfig.language
  @State() region: DsRegion = defaultConfig.region

  /**
   * PUBLIC PROPERTY API
   * ─────────────────────────────────────────────────────
   */

  /**
   * Define the size of badge. Small is recommended for tabs.
   */
  @Prop({ reflect: true })
  @OneOf(CLOSE_SIZES)
  readonly size?: CloseSize

  /**
   * If `true` it supports dark backgrounds.
   */
  @Prop()
  @Type('boolean')
  readonly inverted: boolean = false

  /**
   * If `true` the close component will be disabled and not interactive.
   */
  @Prop({ reflect: true })
  @Type('boolean')
  readonly disabled: boolean = false

  /**
   * If `true` the close component will be rendered as a button element.
   * This is useful when you want to use the close component outside of a notification or alert, for example as a standalone button.
   */
  @Prop()
  @Type('boolean')
  readonly button: boolean = false

  /**
   * Defines the color of the button variant. Only applicable if `button` is `true`.
   */
  @Prop()
  @OneOf(BUTTON_COLORS)
  readonly buttonColor?: ButtonColor

  /**
   * Define the size of the button variant. Only applicable if `button` is `true`.
   */
  @Prop({ reflect: true })
  @OneOf(CLOSE_BUTTON_SIZES)
  readonly buttonSize?: CloseButtonSize

  /**
   * PUBLIC METHODS
   * ─────────────────────────────────────────────────────
   */

  /**
   * @internal define config for the component
   */
  @Method()
  @ListenToConfig()
  async configChanged(state: DsConfigState): Promise<void> {
    this.language = state.language
    this.region = state.region
  }

  /**
   * RENDER
   * ─────────────────────────────────────────────────────
   */

  render() {
    const label = i18nDsClose[this.language].close
    const size = normalizeDeprecatedTShirtSize(this.size) || ''

    if (this.button) {
      return (
        <Host>
          <ds-button
            id="close"
            part="button"
            disabled={this.disabled}
            inverted={this.inverted}
            color={this.buttonColor}
            size={this.buttonSize}
          >
            {label}
          </ds-button>
        </Host>
      )
    }

    return (
      <Host
        class={{
          [`is-${size}`]: hasValue(this.size),
          'is-inverted': this.inverted,
          'is-disabled': this.disabled,
        }}
      >
        <button
          id="close"
          part="button"
          type="button"
          aria-label={label}
          title={label}
          tabindex="0"
          disabled={this.disabled}
        ></button>
      </Host>
    )
  }
}
