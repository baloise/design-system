import { Component, ComponentInterface, Element, Event, EventEmitter, h, Host, Method, Prop, State, Watch } from '@stencil/core'
import { ariaBooleanToString } from 'packages/core/src/utils/aria'
import { AccordionState } from '../../../interfaces'
import { BEM } from '../../../utils/bem'
import { BalConfigState, BalLanguage, defaultConfig, ListenToConfig } from '../../../utils/config'
import { stopEventBubbling } from '../../../utils/form-input'
import { Loggable, Logger, LogInstance } from '../../../utils/log'
import { i18nBalAccordion } from '../bal-accordion.i18n'

type BaseProps = {
  variant: BalProps.BalAccordionTriggerVariant
  id: string
  label: string
  icon: string
  turn: boolean
  expanded: boolean
  buttonPart: string
  triggerAttributes: {
    tabindex: number
  }
}

type ButtonProps = BaseProps & {
  color: BalProps.BalButtonColor
  size: BalProps.BalButtonSize
  expanded: boolean
}

type IconProps = BaseProps & {
  icon: string
  turn: boolean
}

type TextProps = BaseProps & {
  label: string
}

@Component({
  tag: 'bal-accordion-trigger',
  styleUrl: 'bal-accordion-trigger.sass',
})
export class AccordionTrigger implements ComponentInterface, Loggable {
  private componentId = `bal-accordion-trigger-${accordionTriggerIds++}`

  @Element() el?: HTMLElement

  @State() parentAccordionId?: string
  @State() language: BalLanguage = defaultConfig.language

  log!: LogInstance

  @Logger('bal-accordion-trigger')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * @deprecated
   * Trigger will be a bal-button
   */
  @Prop() button = false
  @Watch('button')
  buttonChanged() {
    this.variant = this.button ? 'button' : this.variant
  }

  /**
   * Defines the nature of the accordion trigger.
   */
  @Prop() variant: BalProps.BalAccordionTriggerVariant

  /**
   * If `true` the button is aligned over the whole width
   */
  @Prop() expanded = true

  /**
   * Label of the open trigger button
   */
  @Prop() openLabel = ''

  /**
   * BalIcon of the open trigger button
   */
  @Prop() openIcon = 'caret-down'

  /**
   * Label of the close trigger button
   */
  @Prop() closeLabel = ''

  /**
   * BalIcon of the close trigger button
   */
  @Prop() closeIcon = ''

  /**
   * The color to use from your application's color palette.
   */
  @Prop() color: BalProps.BalButtonColor = 'info'

  /**
   * Size of the button
   */
  @Prop() size: BalProps.BalButtonSize = ''

  /**
   * @internal
   */
  @Prop({ mutable: true, reflect: true }) active = false

  /**
   * @internal
   */
  @Prop() state: AccordionState = AccordionState.Collapsed

  /**
   * Emitted when the component is clicked.
   */
  @Event() balClick!: EventEmitter<BalEvents.BalAccordionClickDetail>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    this.updateAccordionId()
    this.buttonChanged()
  }

  componentWillRender() {
    this.updateAccordionId()
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
   * GETTERS
   * ------------------------------------------------------
   */

  private get parentAccordionElement(): HTMLBalAccordionElement | null {
    return this.el?.closest('bal-accordion') || null
  }

  private get parentAccordionSummaryElement(): HTMLBalAccordionSummaryElement | null {
    return this.el?.closest('bal-accordion-summary') || null
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private updateAccordionId = () => (this.parentAccordionId = this.parentAccordionElement?.id)

  /**
   * EVENT HANDLER
   * ------------------------------------------------------
   */

  private onClick = (ev: BalEvents.BalButtonClick) => {
    stopEventBubbling(ev)
    stopEventBubbling(ev.detail) // stop native event bubbling
    this.parentAccordionElement?.humanToggle()
    this.balClick.emit(ev.detail)
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */
  block = BEM.block('accordion').element('trigger')
  render() {
    const id = this.parentAccordionId ? `${this.parentAccordionId}-trigger` : this.componentId

    const label = this.active ? this.closeLabel : this.openLabel

    let turn = false
    let icon = this.active ? this.closeIcon : this.openIcon
    if (this.closeIcon === '' || this.closeIcon === undefined || this.closeIcon === null) {
      turn = this.active
      icon = this.openIcon || 'caret-down'
    }

    const expanded = this.state === AccordionState.Expanded || this.state === AccordionState.Expanding
    const buttonPart = expanded ? 'button expanded' : 'button'

    const parentSummaryEl = this.parentAccordionSummaryElement
    let triggerAttributes = {
      tabindex: -1,
    }
    if (parentSummaryEl && !parentSummaryEl.trigger) {
      triggerAttributes = {
        tabindex: 0,
      }
    }

    const Trigger = (props: ButtonProps | IconProps | TextProps) => {
      switch (props.variant) {
        case 'button':
          return this.renderButton(props as ButtonProps)
        case 'text':
          return this.renderText(props as TextProps)
        default:
          return this.renderIcon(props as IconProps)
      }
    }

    return (
      <Host
        id={id}
        class={{
          ...this.block.class(),
        }}
      >
        <Trigger
          variant={this.variant}
          {...{
            id,
            label,
            icon,
            turn,
            expanded,
            buttonPart,
            triggerAttributes,
          }}
        ></Trigger>
      </Host>
    )
  }

  renderButton({ id, buttonPart, icon, turn, label }: ButtonProps) {
    return (
      <bal-button
        id={`${id}-button`}
        aria-controls={`${this.parentAccordionId}-details-content`}
        part={buttonPart}
        data-testid="bal-accordion-trigger"
        expanded={this.expanded}
        icon={icon}
        iconTurn={turn}
        color={this.color}
        size={this.size}
        title={this.active ? i18nBalAccordion[this.language].close : i18nBalAccordion[this.language].open}
        aria-label={this.active ? i18nBalAccordion[this.language].close : i18nBalAccordion[this.language].open}
        aria-expanded={ariaBooleanToString(this.active)}
        onBalClick={this.onClick}
      >
        {label}
      </bal-button>
    )
  }

  renderIcon({ buttonPart, triggerAttributes, turn, icon, id }: IconProps) {
    return (
      <button
        class={{
          ...this.block.element('button').class(),
          'bal-focused': triggerAttributes.tabindex === 0,
        }}
        id={`${id}-button`}
        aria-controls={`${this.parentAccordionId}-details-content`}
        aria-expanded={ariaBooleanToString(this.active)}
        part={buttonPart}
        data-testid="bal-accordion-trigger"
        title={this.active ? i18nBalAccordion[this.language].close : i18nBalAccordion[this.language].open}
        aria-label={this.active ? i18nBalAccordion[this.language].close : i18nBalAccordion[this.language].open}
        onClick={this.onClick}
        {...triggerAttributes}
      >
        <bal-icon turn={turn} name={icon}></bal-icon>
      </button>
    )
  }

  renderText({ buttonPart, triggerAttributes, turn, icon, id }: TextProps) {
    const openLabel = this.openLabel || i18nBalAccordion[this.language].open
    const closeLabel = this.closeLabel || i18nBalAccordion[this.language].close

    return (
      <button
        class={{
          ...this.block.element('text').class(),
          'bal-focused': triggerAttributes.tabindex === 0,
        }}
        id={`${id}-button`}
        aria-controls={`${this.parentAccordionId}-details-content`}
        aria-expanded={ariaBooleanToString(this.active)}
        part={buttonPart}
        data-testid="bal-accordion-trigger"
        onClick={this.onClick}
        {...triggerAttributes}
      >
        {this.active ? closeLabel : openLabel}
      </button>
    )
  }
}

let accordionTriggerIds = 0
