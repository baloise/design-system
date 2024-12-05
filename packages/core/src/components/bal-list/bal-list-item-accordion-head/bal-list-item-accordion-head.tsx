import {
  Component,
  Host,
  h,
  Element,
  EventEmitter,
  Event,
  Prop,
  Watch,
  ComponentInterface,
  State,
  Method,
} from '@stencil/core'
import { Loggable, Logger, LogInstance } from '../../../utils/log'
import { isEnterKey, isSpaceKey } from '../../../utils/keyboard'
import { stopEventBubbling } from '../../../utils/form-input'
import { ariaBooleanToString } from '../../../utils/aria'
import { i18nBalListItemAccordionHead } from './bal-list-item-accordion-head.i18n'
import { BalConfigState, BalLanguage, defaultConfig, ListenToConfig } from '../../../utils/config'

export interface BalAria {
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

  @State() ariaState: BalAria = {}
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
  async setAria(aria: BalAria): Promise<void> {
    this.ariaState = { ...aria }
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
        title={
          this.accordionOpen
            ? i18nBalListItemAccordionHead[this.language].close
            : i18nBalListItemAccordionHead[this.language].open
        }
        aria-label={
          this.accordionOpen
            ? i18nBalListItemAccordionHead[this.language].close
            : i18nBalListItemAccordionHead[this.language].open
        }
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

let ListItemAccordionHeadIds = 0
