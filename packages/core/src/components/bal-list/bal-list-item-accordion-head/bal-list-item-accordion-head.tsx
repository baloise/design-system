import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core'
import { ariaBooleanToString } from '../../../utils/aria'
import { BalConfigState, BalLanguage, defaultConfig, ListenToConfig } from '../../../utils/config'
import { stopEventBubbling } from '../../../utils/form-input'
import { isEnterKey, isSpaceKey } from '../../../utils/keyboard'
import { Loggable, Logger, LogInstance } from '../../../utils/log'
import { i18nBalListItemAccordionHead } from './bal-list-item-accordion-head.i18n'

export interface BalListItemAccordionHeadAria {
  controlId?: string
}

@Component({
  tag: 'bal-list-item-accordion-head',
  scoped: false,
  shadow: false,
})
export class ListItemAccordionHead implements ComponentInterface, Loggable {
  private internalId = `bal-list-item-accordion-head-${ListItemAccordionHeadIds++}`

  @Element() el!: HTMLElement

  @State() ariaState: BalListItemAccordionHeadAria = {}
  @State() language: BalLanguage = defaultConfig.language

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
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback(): void {
    this.accordionOpenHandler(this.accordionOpen, false)
  }

  componentDidRender() {
    this.setLabelledby()
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  /**
   * @internal define config for the component
   */
  @Method()
  @ListenToConfig()
  async configChanged(state: BalConfigState): Promise<void> {
    this.language = state.language
  }

  /**
   * PUBLIC METHODS
   * ------------------------------------------------------
   */

  /**
   * @internal
   */
  @Method()
  async setAria(aria: BalListItemAccordionHeadAria): Promise<void> {
    if (aria.controlId && aria.controlId !== this.ariaState.controlId) {
      this.ariaState.controlId = aria.controlId
    }
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private setLabelledby() {
    const bodyEl = this.el.parentElement.querySelector('bal-list-item-accordion-body')
    if (bodyEl) {
      bodyEl.setAria({ labelledby: this.internalId })
    }
  }

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
      stopEventBubbling(ev)
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
        id={this.internalId}
        role="button"
        tabindex="0"
        aria-expanded={ariaBooleanToString(this.accordionOpen)}
        aria-controls={this.ariaState.controlId}
        onClick={this.onClick}
        onKeyDown={this.onKeyDown}
      >
        <slot />
        <bal-list-item-icon right>
          <bal-icon
            class="bal-list__item__accordion-head__icon"
            name={this.icon}
            size="small"
            turn={this.accordionOpen}
            title={
              this.accordionOpen
                ? i18nBalListItemAccordionHead[this.language].close
                : i18nBalListItemAccordionHead[this.language].open
            }
          ></bal-icon>
        </bal-list-item-icon>
      </Host>
    )
  }
}

let ListItemAccordionHeadIds = 0
