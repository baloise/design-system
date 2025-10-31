import { Component, ComponentInterface, Element, Host, Method, Prop, State, h } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { BEM } from '../../utils/bem'
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
  styleUrl: 'bal-close.sass',
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
    const blockEl = BEM.block('close')
    const buttonEl = blockEl.element('button')
    const iconEl = buttonEl.element('icon')
    const label = i18nBalClose[this.language].close

    return (
      <Host class={{ ...blockEl.class() }}>
        <button
          type="button"
          aria-label={label}
          title={label}
          tabindex="0"
          class={{
            ...buttonEl.class(),
            ...buttonEl.modifier('inverted').class(this.inverted),
            ...buttonEl.modifier(`size-${this.size}`).class(this.size !== ''),
          }}
          data-testid="bal-close"
        >
          <bal-icon
            name="close"
            size={this.size === 'small' ? 'x-small' : this.size === 'medium' ? 'medium' : 'small'}
            inverted={this.inverted}
            class={{
              ...iconEl.class(),
            }}
          ></bal-icon>
        </button>
      </Host>
    )
  }
}
