import { Component, Element, h, Host, Prop } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { DsComponentInterface } from '@global'
import { Logger, type LogInstance } from '@utils'
import { ValidateEmptyOrType, setupValidation } from '@utils'

/**
 * Data displays a list of label-value pairs in a organized, accessible format.
 * Supports vertical and horizontal layouts with dividers always shown in vertical layout.
 *
 * @slot - The content of the data list (typically ds-data-item elements).
 */
@Component({
  tag: 'ds-data',
  styleUrl: 'data.host.scss',
  shadow: true,
})
export class Data implements DsComponentInterface {
  log!: LogInstance

  @Logger('data')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  /**
   * If `true` the data list is horizontal instead of vertical.
   */
  @Prop({ reflect: true })
  @ValidateEmptyOrType('boolean')
  readonly horizontal: boolean = false

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
      <Host
        class={{
          'is-horizontal': this.horizontal,
        }}
      >
        <div class="data-container">
          <slot></slot>
        </div>
      </Host>
    )
  }
}
