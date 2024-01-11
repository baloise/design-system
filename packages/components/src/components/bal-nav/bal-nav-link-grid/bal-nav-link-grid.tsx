import { Component, h, ComponentInterface, Host } from '@stencil/core'
import { LogInstance, Loggable, Logger } from '../../../utils/log'
import { BEM } from '../../../utils/bem'
import { BalConfigObserver, BalConfigState, ListenToConfig, defaultConfig } from '../../../utils/config'

@Component({
  tag: 'bal-nav-link-grid',
  styleUrl: 'bal-nav-link-grid.sass',
})
export class NavigationLinkGrid implements ComponentInterface, Loggable, BalConfigObserver {
  private cssUtilities = defaultConfig.cssUtilities
  log!: LogInstance

  @Logger('bal-nav-link-grid')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @ListenToConfig()
  configChanged(state: BalConfigState): void {
    this.cssUtilities = state.cssUtilities
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const block = BEM.block('nav-link-grid')

    return (
      <Host
        class={{
          ...block.class(),
          'grid is-multiline': this.cssUtilities === 'styles',
          'columns is-multiline': this.cssUtilities !== 'styles',
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}
