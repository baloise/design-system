import { Component, ComponentInterface, Event, EventEmitter, h, Host, Listen, Prop } from '@stencil/core'

@Component({
  tag: 'bal-accordion',
  styleUrl: 'bal-accordion.host.scss',
  shadow: true,
})
export class Accordion implements ComponentInterface {
  private accordionId = `bal-accordion-${accordionIds++}`
  private detailsEl: HTMLDetailsElement | undefined
  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * If `true` the accordion is open.
   */
  @Prop({ reflect: true, mutable: true }) open = false

  /**
   * The name of the group the accordion belongs to. Accordions with the same group name will automatically
   * close when another accordion in the same group is opened.
   */
  @Prop() group?: string

  /**
   * Displays the summary as a button and hides the default marker.
   */
  @Prop() button = false

  /**
   * The marker variant. Only applies if `button` is `false`.
   * If `''` the default marker is used, if `plus` a plus icon is used and if `plus-minus`
   * a plus icon for closed and a minus icon for open state is used.
   */
  @Prop() marker?: BalProps.BalAccordionMarker

  /**
   * The position of the marker. Only applies if `button` is `false`.
   */
  @Prop() markerPosition?: BalProps.BalAccordionMarkerPosition

  /**
   * The color of the button. Only applies if `button` is `true`.
   */
  @Prop() buttonColor: BalProps.BalButtonColor = 'secondary'

  /**
   * The size of the button. Only applies if `button` is `true`.
   */
  @Prop() buttonSize: BalProps.BalButtonSize = ''

  /**
   * Label of the open trigger button
   */
  @Prop() buttonLabelOpen = ''

  /**
   * BalIcon of the open trigger button
   */
  @Prop() buttonIconOpen = 'caret-down'

  /**
   * Label of the close trigger button
   */
  @Prop() buttonLabelClose = ''

  /**
   * BalIcon of the close trigger button
   */
  @Prop() buttonIconClose = 'caret-up'

  /**
   * Emitted when the input value has changed.
   */
  @Event() balToggle!: EventEmitter<BalEvents.BalAccordionToggleDetail>

  /**
   * Emitted when the accordion is opened.
   */
  @Event() balOpened!: EventEmitter<BalEvents.BalAccordionToggleDetail>

  /**
   * Emitted when the accordion is closed.
   */
  @Event() balClosed!: EventEmitter<BalEvents.BalAccordionToggleDetail>

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  @Listen('balOpened', { target: 'window' })
  listenOnToggles(event: BalEvents.BalAccordionToggle) {
    const { id, group } = event.detail

    // ignore self
    if (id === this.accordionId) return

    // only react if same group (or no group = global)
    if ((this.group && group !== this.group) || this.group === undefined) return

    this.open = false
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private handleToggle(open: boolean) {
    this.open = open

    this.balToggle.emit({ id: this.accordionId, group: this.group, open })

    if (open) {
      this.balOpened.emit({ id: this.accordionId, group: this.group, open })
    } else {
      this.balClosed.emit({ id: this.accordionId, group: this.group, open })
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
          'has-marker-plus': this.marker === 'plus' || (this.marker === 'plus-minus' && !this.open),
          'has-marker-minus': this.marker === 'plus-minus' && this.open,
        }}
      >
        <details
          id={this.accordionId}
          part="item"
          class={{
            'accordion': true,
            'has-marker-none': this.button || this.marker === 'none',
            'has-marker-plus': this.marker === 'plus',
            'has-marker-plus-minus': this.marker === 'plus-minus',
            'has-marker-left': this.markerPosition === 'left',
          }}
          open={this.open}
          name={this.group}
          ref={el => (this.detailsEl = el as HTMLDetailsElement)}
          onToggle={() => {
            this.handleToggle(this.detailsEl?.open ?? false)
          }}
        >
          <summary
            part="summary"
            class={{
              'button': this.button,
              'at-end': this.button,
              [`is-${this.buttonColor}`]: this.button,
              [`is-${this.buttonSize}`]: this.button,
            }}
          >
            {this.button && this.buttonIconOpen && (
              <bal-icon name={this.buttonIconOpen} size="small" class="is-closed"></bal-icon>
            )}
            {this.button && this.buttonLabelOpen && <span class="is-closed"> {this.buttonLabelOpen} </span>}
            {this.button && this.buttonIconClose && (
              <bal-icon name={this.buttonIconClose} size="small" class="is-open"></bal-icon>
            )}
            {this.button && this.buttonLabelClose && <span class="is-open"> {this.buttonLabelClose} </span>}
            <slot name="summary" />
          </summary>
          <div class="content" part="content">
            <slot name="content" />
            <slot />
          </div>
        </details>
      </Host>
    )
  }
}

let accordionIds = 1
