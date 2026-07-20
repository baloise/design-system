import { Component, Element, h, Host, Prop } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { DsComponentInterface } from '@global'
import { Logger, type LogInstance, Type } from '@utils'

/**
 * Select optgroup groups `ds-select-option` elements under a label, as HTML markup — the
 * grouped counterpart to `ds-select-option`. The element itself renders nothing visible;
 * `ds-select` reads its `label` and its `ds-select-option` children.
 *
 * @slot - One or more ds-select-option elements.
 */
@Component({
  tag: 'ds-select-optgroup',
  styleUrl: 'select-optgroup.host.scss',
  shadow: true,
})
export class DsSelectOptgroup implements DsComponentInterface {
  log!: LogInstance
  @Logger('select-optgroup')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * The label displayed above this group of options.
   */
  @Prop()
  @Type('string')
  readonly label: string = ''

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    return (
      <Host aria-hidden="true">
        <slot></slot>
      </Host>
    )
  }
}
