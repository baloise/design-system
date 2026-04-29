import { Component, Element, Event, EventEmitter, h, Host, Listen, Method, Prop, State } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import {
  ariaBooleanToString,
  Logger,
  type LogInstance,
  ValidateEmptyOrOneOf,
  ValidateEmptyOrType,
  setupValidation,
} from '@utils'
import { DsComponentInterface, DsConfigObserver, DsConfigState, ListenToConfig } from '@global'
import {
  ACCORDION_SUMMARY_LEVELS,
  ACCORDION_MARKERS,
  ACCORDION_MARKER_POSITIONS,
  ACCORDION_BUTTON_COLORS,
  ACCORDION_BUTTON_SIZES,
  type AccordionSummaryLevel,
  type AccordionMarker,
  type AccordionMarkerPosition,
  type AccordionButtonColor,
  type AccordionButtonSize,
  type AccordionToggleDetail,
  type AccordionToggle,
} from './accordion.interfaces'
import { DsComponentDescriptionListDetailWeight } from 'packages/tokens/dist/js/base.tokens'

@Component({
  tag: 'ds-accordion',
  styleUrl: 'accordion.host.scss',
  shadow: true,
})
export class Accordion implements DsComponentInterface, DsConfigObserver {
  private accordionId = `ds-accordion-${accordionIds++}`

  @State() animated = true
  @State() isAnimating = false

  @Element() el!: HTMLStencilElement

  log!: LogInstance

  @Logger('accordion')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * If `true` the accordion is open.
   */
  @Prop({ reflect: true, mutable: true })
  @ValidateEmptyOrType('boolean')
  open = false

  /**
   * The name of the group the accordion belongs to. Accordions with the same group name will automatically
   * close when another accordion in the same group is opened.
   */
  @Prop({ reflect: true })
  @ValidateEmptyOrType('string')
  readonly group: string = ''

  /**
   * The heading level of the summary
   */
  @Prop()
  @ValidateEmptyOrOneOf(...ACCORDION_SUMMARY_LEVELS)
  readonly summaryLevel: AccordionSummaryLevel = 'h3'

  /**
   * The visual heading level of the summary.
   */
  @Prop()
  @ValidateEmptyOrOneOf(...ACCORDION_SUMMARY_LEVELS)
  readonly summaryVisualLevel: AccordionSummaryLevel = ''

  /**
   * If `true` the summary is styled as a title.
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly summaryTitle: boolean = false

  /**
   * The marker variant. Only applies if `button` is `false`.
   * If `''` the default marker is used, if `plus` a plus icon is used and if `plus-minus`
   * a plus icon for closed and a minus icon for open state is used.
   */
  @Prop()
  @ValidateEmptyOrOneOf(...ACCORDION_MARKERS)
  readonly marker: AccordionMarker = ''

  /**
   * The position of the marker. Only applies if `button` is `false`.
   */
  @Prop()
  @ValidateEmptyOrOneOf(...ACCORDION_MARKER_POSITIONS)
  readonly markerPosition: AccordionMarkerPosition = ''

  /**
   * Displays the summary as a button and hides the default marker.
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly button: boolean = false

  /**
   * If `true` the button is expanded to full width. Only applies if `button` is `true`.
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly buttonWide: boolean = false

  /**
   * The color of the button. Only applies if `button` is `true`.
   */
  @Prop()
  @ValidateEmptyOrOneOf(...ACCORDION_BUTTON_COLORS)
  readonly buttonColor: AccordionButtonColor = 'primary'

  /**
   * The size of the button. Only applies if `button` is `true`.
   */
  @Prop()
  @ValidateEmptyOrOneOf(...ACCORDION_BUTTON_SIZES)
  readonly buttonSize: AccordionButtonSize = ''

  /**
   * Label of the open trigger button
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly buttonLabelOpen: string = ''

  /**
   * BalIcon of the open trigger button
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly buttonIconOpen: string = ''

  /**
   * Label of the close trigger button
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly buttonLabelClose: string = ''

  /**
   * BalIcon of the close trigger button
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly buttonIconClose: string = ''

  /**
   * Emitted when the input value has changed.
   */
  @Event() dsToggle!: EventEmitter<AccordionToggleDetail>

  /**
   * Emitted when the accordion is opened.
   */
  @Event() dsOpened!: EventEmitter<AccordionToggleDetail>

  /**
   * Emitted when the accordion is closed.
   */
  @Event() dsClosed!: EventEmitter<AccordionToggleDetail>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback(): void {
    setupValidation(this)
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  @Listen('dsOpened', { target: 'window' })
  listenToDsOpened(event: AccordionToggle) {
    const { id, group } = event.detail

    // ignore self
    if (id === this.accordionId) return

    // only react if same group (or no group = global)
    if ((this.group && group !== this.group) || this.group === undefined) return

    this.open = false
  }

  /**
   * @internal define config for the component
   */
  @Method()
  @ListenToConfig()
  async configChanged(state: DsConfigState): Promise<void> {
    this.animated = state.animated
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private handleToggle(event: MouseEvent, open: boolean) {
    // check if target is link or button and ignore toggle if so,
    // to allow nested interactive elements in the summary
    const target = event.target as HTMLElement
    const interactiveElement = target.closest('a, button, input, ds-toggle, ds-checkbox')
    if (interactiveElement && interactiveElement !== (event.currentTarget as HTMLElement)) {
      return
    }

    if (this.animated) {
      this.isAnimating = true
    } else {
      this.isAnimating = false
    }

    this.open = open

    this.dsToggle.emit({ id: this.accordionId, group: this.group, open })

    if (open) {
      this.dsOpened.emit({ id: this.accordionId, group: this.group, open })
    } else {
      this.dsClosed.emit({ id: this.accordionId, group: this.group, open })
    }
  }

  private handleContentTransitionEnd = (_event: TransitionEvent) => {
    if (this.animated) {
      this.isAnimating = false
    }
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const MarkerIcon = (
      <ds-icon
        id="marker"
        part="marker"
        class={{
          'has-marker-plus': this.marker === 'plus' || (this.marker === 'plus-minus' && !this.open),
          'has-marker-minus': this.marker === 'plus-minus' && this.open,
        }}
        name={
          this.marker === 'plus' ? 'plus' : this.marker !== 'plus-minus' ? 'caret-down' : this.open ? 'minus' : 'plus'
        }
      ></ds-icon>
    )

    return (
      <Host
        class={{
          'is-button': !!this.buttonIconOpen || !!this.buttonIconClose,
          'is-title': this.summaryTitle === true || this.summaryVisualLevel !== undefined,
          [`is-${this.summaryVisualLevel}`]: !!this.summaryVisualLevel,
          'is-animated': !!this.animated,
          'is-animating': !!this.animated && this.isAnimating,
        }}
      >
        {/* ---------------------------------------- */}
        {/* Summary                                  */}
        {/* ---------------------------------------- */}
        <this.summaryLevel id="header" part="header">
          <button
            type="button"
            aria-expanded={ariaBooleanToString(this.open)}
            aria-controls="content"
            id="summary"
            part="summary"
            onClick={ev => this.handleToggle(ev, !this.open)}
            class={{
              'button': this.button,
              'is-wide': this.buttonWide,
              [`is-${this.buttonColor}`]: !!this.buttonColor,
              [`is-${this.buttonSize}`]: !!this.buttonSize,
              'has-marker-left': this.markerPosition === 'left',
            }}
          >
            {/* ---------------------------------------- */}
            {/* Summary Button Icon                      */}
            {/* ---------------------------------------- */}
            {this.buttonIconOpen || this.buttonIconClose ? (
              <ds-icon
                id="marker"
                part="marker"
                name={this.open ? this.buttonIconOpen : this.buttonIconClose}
              ></ds-icon>
            ) : (
              this.button && MarkerIcon
            )}
            {/* ---------------------------------------- */}
            {/* Summary Label                            */}
            {/* ---------------------------------------- */}
            <span id="label" class={{ 'is-button': this.button }}>
              <slot name="summary">{this.open ? this.buttonLabelOpen : this.buttonLabelClose}</slot>
            </span>
            {/* ---------------------------------------- */}
            {/* Summary Marker                           */}
            {/* ---------------------------------------- */}
            {!this.button && this.marker !== 'none' && !this.buttonIconOpen && MarkerIcon}
          </button>
        </this.summaryLevel>
        {/* ---------------------------------------- */}
        {/* Content                                  */}
        {/* ---------------------------------------- */}
        <div
          id="content"
          role="region"
          aria-labelledby="summary"
          part="content"
          hidden={!this.open}
          onTransitionEnd={this.handleContentTransitionEnd}
        >
          <div id="inner">
            <slot name="content" />
          </div>
        </div>
      </Host>
    )
  }
}

let accordionIds = 1
