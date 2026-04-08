import { Component, ComponentInterface, Element, Host, Method, Prop, State, h } from '@stencil/core'
import { HTMLStencilElement, Watch } from '@stencil/core/internal'
import {
  DsConfigObserver,
  DsConfigState,
  DsLanguage,
  DsRegion,
  ListenToConfig,
  defaultConfig,
} from '../../utils/config'
import { i18nDsClose } from './close.i18n'
import { normalizeDeprecatedTShirtSize } from '../../utils/t-shirt'

@Component({
  tag: 'ds-close',
  styleUrl: 'close.host.scss',
  shadow: true,
})
export class Close implements ComponentInterface, DsConfigObserver {
  @Element() el!: HTMLStencilElement

  @State() language: DsLanguage = defaultConfig.language
  @State() region: DsRegion = defaultConfig.region

  /**
   * Define the size of badge. Small is recommended for tabs.
   */
  @Prop({ mutable: true, reflect: true }) size?: DS.CloseSize
  @Watch('size')
  validateSize(newValue: DS.CloseSize) {
    this.size = normalizeDeprecatedTShirtSize(newValue) || undefined
  }

  /**
   * If `true` it supports dark backgrounds.
   */
  @Prop() inverted = false

  /**
   * If `true` the close component will be disabled and not interactive.
   */
  @Prop({ reflect: true }) disabled = false

  /**
   * If `true` the close component will be rendered as a button element.
   * This is useful when you want to use the close component outside of a notification or alert, for example as a standalone button.
   */
  @Prop() button = false

  /**
   * Defines the color of the button variant. Only applicable if `button` is `true`.
   */
  @Prop() buttonColor?: DS.ButtonColor

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
    this.size = normalizeDeprecatedTShirtSize(this.size) || undefined
  }

  render() {
    const label = i18nDsClose[this.language].close

    if (this.button) {
      return (
        <Host>
          <bal-button
            id="close"
            part="button"
            disabled={this.disabled}
            inverted={this.inverted}
            color={this.buttonColor}
            size={this.size === 'sm' ? 'sm' : this.size === 'md' ? 'lg' : ''}
          >
            {label}
          </bal-button>
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
