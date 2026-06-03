import { Component, Element, h, Host, Prop } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { DsComponentInterface } from '@global'
import { Logger, type LogInstance } from '@utils'
import { ValidateEmptyOrType, setupValidation } from '@utils'

/**
 * DataLabel is a label element for use within ds-data-item.
 * It displays a label with optional required indicator.
 *
 * @slot - The label text content.
 */
@Component({
  tag: 'ds-data-label',
  styleUrl: 'data-label.host.scss',
  shadow: false,
})
export class DataLabel implements DsComponentInterface {
  log!: LogInstance

  @Logger('data-label')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  /**
   * If `true` an asterisk is added after the label.
   */
  @Prop({ reflect: true })
  @ValidateEmptyOrType('boolean')
  readonly required: boolean = false

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
    return (
      <Host>
        <slot></slot>
        {this.required ? <span>*</span> : ''}
      </Host>
    )
  }
}
