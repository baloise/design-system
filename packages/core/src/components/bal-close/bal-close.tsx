import { Component, ComponentInterface, Element, Host, Method, Prop, State, h } from '@stencil/core'
import { HTMLStencilElement, Watch } from '@stencil/core/internal'
import {
  BalConfigObserver,
  BalConfigState,
  BalLanguage,
  BalRegion,
  ListenToConfig,
  defaultConfig,
} from '../../utils/config'
import { i18nBalClose } from './bal-close.i18n'
import { normalizeDeprecatedTShirtSize } from '../../utils/t-shirt'

@Component({
  tag: 'bal-close',
  styleUrl: 'bal-close.host.scss',
  shadow: true,
})
export class Close implements ComponentInterface, BalConfigObserver {
  @Element() el!: HTMLStencilElement

  @State() language: BalLanguage = defaultConfig.language
  @State() region: BalRegion = defaultConfig.region

  /**
   * Define the size of badge. Small is recommended for tabs.
   */
  @Prop({ mutable: true, reflect: true }) size: BalProps.BalCloseSize = undefined
  @Watch('size')
  validateSize(newValue: BalProps.BalCloseSize) {
    this.size = normalizeDeprecatedTShirtSize(newValue) || undefined
  }

  /**
   * If `true` it supports dark backgrounds.
   */
  @Prop({ reflect: true }) inverted = false

  /**
   * @internal define config for the component
   */
  @Method()
  @ListenToConfig()
  async configChanged(state: BalConfigState): Promise<void> {
    this.language = state.language
    this.region = state.region
  }

  connectedCallback(): void {
    this.size = normalizeDeprecatedTShirtSize(this.size) || undefined
  }

  render() {
    const label = i18nBalClose[this.language].close

    return (
      <Host>
        <button id="close" part="button" type="button" aria-label={label} title={label} tabindex="0"></button>
      </Host>
    )
  }
}
