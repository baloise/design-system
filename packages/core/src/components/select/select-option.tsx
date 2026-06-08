import { Component, Element, Prop, Host, h } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { Logger, type LogInstance } from '@utils'
import { DsComponentInterface } from '@global'

/**
 * SelectOption is a container component for defining options within a Select component.
 * It is not visually rendered; instead, the parent Select component extracts the value
 * and text content to populate its native select element.
 *
 * @internal Used only within ds-select component
 */
@Component({
  tag: 'ds-select-option',
  styleUrl: 'select-option.host.scss',
  shadow: true,
})
export class SelectOption implements DsComponentInterface {
  log!: LogInstance
  @Logger('select-option')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * The value that will be returned when this option is selected.
   */
  @Prop()
  readonly value!: string

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    return <Host aria-hidden="true"></Host>
  }
}
