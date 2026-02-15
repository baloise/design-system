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
import { normalize } from 'path'
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
  @Prop({ mutable: true }) size: BalProps.BalCloseSize = ''
  @Watch('size')
  validateSize(newValue: BalProps.BalCloseSize) {
    this.size = normalizeDeprecatedTShirtSize(newValue) || ''
  }

  /**
   * If `true` it supports dark backgrounds.
   */
  @Prop() inverted = false

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
    console.log('START', this.size)
    this.size = normalizeDeprecatedTShirtSize(this.size) || ''
    console.log('END', this.size)
  }

  render() {
    const label = i18nBalClose[this.language].close

    console.log(this.size)

    return (
      <Host>
        <button
          id="close"
          part="button"
          type="button"
          aria-label={label}
          title={label}
          tabindex="0"
          class={{
            'is-sm': this.size === 'sm',
            'is-md': this.size === 'md',
            'is-inverted': this.inverted,
          }}
          data-testid="bal-close"
        ></button>
      </Host>
    )
  }
}
