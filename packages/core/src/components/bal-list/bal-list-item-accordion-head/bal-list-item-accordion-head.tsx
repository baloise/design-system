import { Component, Host, h, Element, EventEmitter, Event, Prop, Watch, ComponentInterface } from '@stencil/core'
import { Loggable, Logger, LogInstance } from '../../../utils/log'
import { isEnterKey, isSpaceKey } from '@baloise/web-app-utils'

@Component({
  tag: 'bal-list-item-accordion-head',
  scoped: false,
  shadow: false,
})
export class ListItemAccordionHead implements ComponentInterface, Loggable {
  @Element() el!: HTMLElement

  log!: LogInstance

  @Logger('bal-list-item-accordion-head')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * If `true` the list accordion is open
   */
  @Prop({ mutable: true }) accordionOpen = false

  @Watch('accordionOpen')
  accordionOpenHandler(newValue: boolean, oldValue: boolean) {
    if (newValue !== oldValue) {
      this.balAccordionChange.emit(this.accordionOpen)
    }
  }

  /**
   * Icon name string with value 'plus' on default
   */
  @Prop() icon: BalProps.BalListItemAccordionHeadIcon = 'plus'

  /**
   * Emitted when the accordion state is changed
   */
  @Event() balAccordionChange!: EventEmitter<BalEvents.BalListAccordionChangeDetail>

  /**
   * EVENT BINDING
   * ------------------------------------------------------
   */

  private onClick = () => {
    if (this.el.closest('bal-list-item')) {
      this.accordionOpen = !this.accordionOpen
    }
  }

  private onKeyDown = (ev: KeyboardEvent) => {
    if (isSpaceKey(ev) || isEnterKey(ev)) {
      this.onClick()
    }
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    return (
      <Host
        class={{
          'bal-list__item': true,
          'bal-list__item__accordion-head': true,
          'bal-list__item__accordion-head--open': this.accordionOpen,
        }}
        role="button"
        tabindex="0"
        onClick={this.onClick}
        onKeyDown={this.onKeyDown}
      >
        <slot></slot>
        <bal-list-item-icon right>
          <bal-icon
            class="bal-list__item__accordion-head__icon"
            name={this.icon}
            size="small"
            turn={this.accordionOpen}
          ></bal-icon>
        </bal-list-item-icon>
      </Host>
    )
  }
}
