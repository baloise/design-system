import { Component, Element, h, Host } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { Logger, type LogInstance } from '@utils'
import { DsComponentInterface } from '@global'

/**
 * Hint Title renders the heading inside a ds-hint panel. Place it as a direct child of ds-hint.
 * Uses light DOM (no shadow) so ds-hint's named slot projects the content correctly.
 *
 * @slot - The hint title text.
 */
@Component({
  tag: 'ds-hint-title',
})
export class HintTitle implements DsComponentInterface {
  log!: LogInstance

  @Logger('hint-title')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  connectedCallback(): void {
    this.el.slot = 'title'
  }

  render() {
    return (
      <Host style={{ display: 'contents' }}>
        <slot />
      </Host>
    )
  }
}
