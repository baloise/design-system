import { Component, ComponentInterface, Element, Host, Method, Prop, State, h } from '@stencil/core'
import { HTMLStencilElement, Watch } from '@stencil/core/internal'
import {
  normalizeDeprecatedTShirtSize,
  Loggable,
  Logger,
  type LogInstance,
  ValidateEmptyOrOneOf,
  ValidateEmptyOrType,
  setupValidation,
} from '@utils'
import { DsConfigObserver, DsConfigState, DsLanguage, DsRegion, ListenToConfig, defaultConfig } from '@global'
import { i18nDsClose } from './close.i18n'

@Component({
  tag: 'ds-close',
  styleUrl: 'close.host.scss',
  shadow: true,
})
export class Close implements ComponentInterface, DsConfigObserver, Loggable {
  log!: LogInstance

  @Logger('close')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  @State() language: DsLanguage = defaultConfig.language
  @State() region: DsRegion = defaultConfig.region

  /**
   * Define the size of badge. Small is recommended for tabs.
   */
  @Prop({ mutable: true, reflect: true })
  @ValidateEmptyOrOneOf('', 'xs', 'sm', 'md', 'lg', 'xl')
  size?: DS.CloseSize
  @Watch('size')
  sizeChanged(newValue: DS.CloseSize) {
    this.size = normalizeDeprecatedTShirtSize(newValue) || undefined
  }

  /**
   * If `true` it supports dark backgrounds.
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly inverted: boolean = false

  /**
   * If `true` the close component will be disabled and not interactive.
   */
  @Prop({ reflect: true })
  @ValidateEmptyOrType('boolean')
  readonly disabled: boolean = false

  /**
   * If `true` the close component will be rendered as a button element.
   * This is useful when you want to use the close component outside of a notification or alert, for example as a standalone button.
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly button: boolean = false

  /**
   * Defines the color of the button variant. Only applicable if `button` is `true`.
   */
  @Prop()
  @ValidateEmptyOrOneOf('primary', 'secondary', 'success', 'warning', 'danger', '')
  readonly buttonColor?: DS.ButtonColor

  /**
   * @internal define config for the component
   */
  @Method()
  @ListenToConfig()
  async configChanged(state: DsConfigState): Promise<void> {
    this.language = state.language
    this.region = state.region
  }

  connectedCallback(): void {
    setupValidation(this)
  }

  render() {
    const label = i18nDsClose[this.language].close

    if (this.button) {
      return (
        <Host>
          <ds-button
            id="close"
            part="button"
            disabled={this.disabled}
            inverted={this.inverted}
            color={this.buttonColor}
            size={this.size === 'sm' ? 'sm' : this.size === 'md' ? 'lg' : ''}
          >
            {label}
          </ds-button>
        </Host>
      )
    }

    return (
      <Host
        class={{
          [`is-${this.size}`]: !!this.size,
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
