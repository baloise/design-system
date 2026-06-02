import { Component, Element, h, Host, Prop } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { DsComponentInterface } from '@global'
import { Logger, type LogInstance } from '@utils'
import { ValidateEmptyOrType, setupValidation } from '@utils'

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

  connectedCallback(): void {
    this.validateProps()
    setupValidation(this)
  }

  componentWillUpdate(): void {
    this.validateProps()
    setupValidation(this)
  }

  private validateProps(): void {
    // Validation delegated to @Prop decorators and setupValidation
  }

  render() {
    return <Host><slot></slot></Host>
  }
}
