import { Component, Element, h, Host } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { Logger, type LogInstance } from '@utils'
import { DsComponentInterface } from '@global'

/**
 * Modal Header renders the title area of a ds-modal. Place it as a direct child of ds-modal.
 * Intentionally uses light DOM (no shadow) so that ds-modal's aria-labelledby can resolve
 * the heading text through the slot chain without crossing shadow boundaries.
 *
 * @slot - The modal title text.
 */
@Component({
  tag: 'ds-modal-header',
})
export class ModalHeader implements DsComponentInterface {
  log!: LogInstance

  @Logger('modal-header')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  connectedCallback(): void {
    this.el.slot = 'header'
  }

  render() {
    return (
      <Host style={{ display: 'contents' }}>
        <slot />
      </Host>
    )
  }
}
