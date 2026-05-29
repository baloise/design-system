import { Component, Element, h, Host } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { Logger, type LogInstance } from '@utils'
import { DsComponentInterface } from '@global'

/**
 * Modal Body renders the content area of a ds-modal. Place it as a direct child of ds-modal.
 *
 * @slot - The modal body content.
 */
@Component({
  tag: 'ds-modal-body',
  styleUrl: 'modal-body.host.scss',
  shadow: true,
})
export class ModalBody implements DsComponentInterface {
  log!: LogInstance

  @Logger('modal-body')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  connectedCallback(): void {
    this.el.slot = 'body'
  }

  render() {
    return (
      <Host>
        <slot />
      </Host>
    )
  }
}
