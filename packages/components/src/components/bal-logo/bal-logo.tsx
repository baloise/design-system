import { Component, h, ComponentInterface, Host, Element, Prop, State } from '@stencil/core'
import {
  attachComponentToConfig,
  BalConfigObserver,
  BalConfigState,
  BalLanguage,
  defaultConfig,
  detachComponentToConfig,
} from '../../'
import { logos } from './logos'

@Component({
  tag: 'bal-logo',
})
export class Logo implements ComponentInterface, BalConfigObserver {
  @Element() el!: HTMLElement

  @State() language: BalLanguage = defaultConfig.language

  /**
   * Defines the color of the logo.
   */
  @Prop() color: 'blue' | 'white' = 'blue'

  /**
   * Defines the which branded logo.
   */
  @Prop() brand: 'group' | 'soba' | 'insurance' = 'group'

  connectedCallback() {
    attachComponentToConfig(this)
  }

  disconnectedCallback() {
    detachComponentToConfig(this)
  }

  configChanged(config: BalConfigState): void {
    this.language = config.language
  }

  private get svgContent() {
    return logos[this.brand][this.language]
  }

  render() {
    return (
      <Host
        class={{
          [`has-color-${this.color}`]: true,
        }}
      >
        <div innerHTML={this.svgContent}></div>
      </Host>
    )
  }
}
