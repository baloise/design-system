import { Component, ComponentInterface, Element, Host, Method, Prop, State, h } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import {
  BalConfigObserver,
  BalConfigState,
  BalLanguage,
  BalRegion,
  ListenToConfig,
  defaultConfig,
} from '../../utils/config'
import { i18nBalClose } from './bal-close.i18n'

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
  @Prop() size: BalProps.BalCloseSize = ''

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

  render() {
    const label = i18nBalClose[this.language].close

    return (
      <Host>
        <button
          type="button"
          aria-label={label}
          title={label}
          tabindex="0"
          class={{
            'close': true,
            'is-small': this.size === 'small',
            'is-medium': this.size === 'medium',
            'is-inverted': this.inverted,
          }}
          data-testid="bal-close"
        ></button>
      </Host>
    )
  }
}
