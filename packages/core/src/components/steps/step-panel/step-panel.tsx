import { Component, Element, h, Host, Prop } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { DsComponentInterface } from '@global'
import { Logger, type LogInstance, Required, Type } from '@utils'

/**
 * Step Panel displays the content area associated with a ds-step, visible when its controlling step is selected.
 *
 * @slot - The panel content.
 */
@Component({
  tag: 'ds-step-panel',
  styleUrl: 'step-panel.host.scss',
  shadow: true,
})
export class StepPanel implements DsComponentInterface {
  log!: LogInstance

  @Logger('step-panel')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * Matches the `name` of the ds-step that controls this panel.
   */
  @Prop({ reflect: true })
  @Required()
  @Type('string')
  readonly for!: string

  /**
   * If `true`, the panel is visible. Managed by the parent ds-steps.
   */
  @Prop({ mutable: true, reflect: true })
  @Type('boolean')
  readonly selected: boolean = false

  /**
   * PROPERTY VALIDATION
   * ------------------------------------------------------
   */

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    return (
      <Host
        role="tabpanel"
        class={{ 'is-selected': this.selected }}
        aria-hidden={this.selected ? null : 'true'}
        tabIndex={this.selected ? 0 : -1}
      >
        <slot />
      </Host>
    )
  }
}
