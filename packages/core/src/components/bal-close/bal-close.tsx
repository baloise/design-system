import { Component, h, ComponentInterface, Host, Element, Prop, Method, State } from '@stencil/core'
import { inheritAttributes } from '../../utils/attributes'
import { BEM } from '../../utils/bem'
import { BalConfigObserver, BalConfigState } from '../../interfaces'
import { BalLanguage, BalRegion, ListenToConfig, defaultConfig } from '../../utils/config'
import { i18nBalClose } from './bal-close.i18n'

@Component({
  tag: 'bal-close',
  styleUrl: 'bal-close.sass',
})
export class Close implements ComponentInterface, BalConfigObserver {
  private inheritedAttributes: { [k: string]: any } = {}

  @Element() el!: HTMLElement

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

  componentWillRender() {
    this.inheritedAttributes = inheritAttributes(this.el, ['tabindex'])
  }

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
          tabindex={-1}
          class={{
            ...buttonEl.class(),
            ...buttonEl.modifier('inverted').class(this.inverted),
            ...buttonEl.modifier(`size-${this.size}`).class(this.size !== ''),
          }}
          data-testid="bal-close"
          {...this.inheritedAttributes}
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
