import { Component, Element, h, Host } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { Logger, type LogInstance } from '@utils'
import { DsComponentInterface } from '@global'

/**
 * Hint Text renders the body content inside a ds-hint panel. Place it as a direct child of ds-hint.
 * Projects into the default slot of ds-hint.
 *
 * @slot - The hint body text.
 */
@Component({
  tag: 'ds-hint-text',
})
export class HintText implements DsComponentInterface {
  log!: LogInstance

  @Logger('hint-text')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  render() {
    return (
      <Host style={{ display: 'contents' }}>
        <slot />
      </Host>
    )
  }
}
