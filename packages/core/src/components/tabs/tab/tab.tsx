import { Component, Element, Event, EventEmitter, h, Host, Prop } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { DsComponentInterface } from '@global'
import { Logger, type LogInstance, Required, Type } from '@utils'

/**
 * Tab renders a single tab button inside a ds-tabs group, supporting both the panels and navigation variants.
 *
 * @slot - The tab label, or an <a> element in navigation mode.
 */
@Component({
  tag: 'ds-tab',
  styleUrl: 'tab.host.scss',
  shadow: true,
})
export class Tab implements DsComponentInterface {
  log!: LogInstance

  @Logger('tab')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * Set by ds-tabs. When true, the tab expands to fill available width.
   * @internal
   */
  @Prop({ mutable: true })
  @Type('boolean')
  readonly fullwidth: boolean = false

  /**
   * Set by ds-tabs. When true, the tab renders in inverted (dark background) mode.
   * @internal
   */
  @Prop({ mutable: true })
  @Type('boolean')
  readonly inverted: boolean = false

  /**
   * Unique name that links this tab to a ds-tab-panel[for] of the same value in panels mode.
   */
  @Prop({ reflect: true })
  @Required()
  @Type('string')
  readonly name!: string

  /**
   * Set by ds-tabs. When true, renders as a slot wrapper for navigation mode.
   * @internal
   */
  @Prop({ mutable: true })
  @Type('boolean')
  readonly navigation: boolean = false

  /**
   * If `true`, this tab is currently selected. Set by the parent ds-tabs.
   */
  @Prop({ mutable: true, reflect: true })
  @Type('boolean')
  readonly selected: boolean = false

  /**
   * Set by ds-tabs. When true, renders in vertical layout.
   * @internal
   */
  @Prop({ mutable: true })
  @Type('boolean')
  readonly vertical: boolean = false

  /**
   * Emitted when the user clicks this tab (panels mode only).
   */
  @Event() dsTabSelect!: EventEmitter<{ name: string }>
  /**
   * PROPERTY VALIDATION
   * ------------------------------------------------------
   */

  /**
   * EVENT HANDLERS
   * ------------------------------------------------------
   */

  private handleClick = (ev: MouseEvent) => {
    ev.preventDefault()
    this.dsTabSelect.emit({ name: this.name })
  }

  private handleKeyDown = (ev: KeyboardEvent) => {
    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault()
      this.dsTabSelect.emit({ name: this.name })
    }
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const hostClass = {
      'is-selected': this.selected,
      'is-fullwidth': this.fullwidth,
      'is-inverted': this.inverted,
      'is-navigation': this.navigation,
      'is-vertical': this.vertical,
    }

    if (this.navigation) {
      return (
        <Host role="none" class={hostClass}>
          <slot />
        </Host>
      )
    }

    return (
      <Host
        role="tab"
        class={hostClass}
        aria-selected={String(this.selected)}
        tabIndex={this.selected ? 0 : -1}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
      >
        <span class={{ 'is-selected': this.selected }}>
          <slot />
        </span>
      </Host>
    )
  }
}
