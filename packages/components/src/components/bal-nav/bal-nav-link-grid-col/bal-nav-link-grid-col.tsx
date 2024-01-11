import { Component, h, ComponentInterface, Host, Prop } from '@stencil/core'
import { LogInstance, Loggable, Logger } from '../../../utils/log'
import { BEM } from '../../../utils/bem'
import { BalConfigObserver, BalConfigState } from '../../../interfaces'
import { ListenToConfig, defaultConfig } from '../../../utils/config'

@Component({
  tag: 'bal-nav-link-grid-col',
  styleUrl: 'bal-nav-link-grid-col.sass',
})
export class NavigationLinkGridCol implements ComponentInterface, Loggable, BalConfigObserver {
  private cssUtilities = defaultConfig.cssUtilities
  log!: LogInstance

  @Logger('bal-nav-link-grid-col')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * Defines the static column which is always aligned to the right
   */
  @Prop() staticCol: BalProps.BalNavLinkGridCol = false

  @ListenToConfig()
  configChanged(state: BalConfigState): void {
    this.cssUtilities = state.cssUtilities
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const block = BEM.block('nav-link-grid-col')
    const innerEl = block.element('inner')
    const widescreenPositionClass =
      this.cssUtilities === 'styles'
        ? this.staticCol
          ? 'widescreen:is-one-third'
          : 'widescreen:is-two-thirds'
        : this.staticCol
        ? 'is-one-third-widescreen'
        : 'is-two-thirds-widescreen'

    return (
      <Host
        class={{
          ...block.class(),
          ...block.modifier('is-static').class(this.staticCol),
          'col is-full desktop:is-6 desktop:is-half': this.cssUtilities === 'styles',
          'column is-full is-6-desktop is-half-desktop': this.cssUtilities !== 'styles',
          [`${widescreenPositionClass}`]: true,
        }}
      >
        <div
          class={{
            ...innerEl.class(),
          }}
        >
          <slot></slot>
        </div>
      </Host>
    )
  }
}
