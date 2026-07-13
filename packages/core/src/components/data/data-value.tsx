import { Component, Element, h, Host } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { DsComponentInterface } from '@global'
import { Logger, type LogInstance } from '@utils'

/**
 * DataValue is a value element for use within ds-data-item.
 * Pass-through slot container for value content.
 *
 * @slot - The value content (text, HTML, or custom elements).
 */
@Component({
  tag: 'ds-data-value',
  styleUrl: 'data-value.host.scss',
  shadow: false,
})
export class DataValue implements DsComponentInterface {
  log!: LogInstance

  @Logger('data-value')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    )
  }
}
