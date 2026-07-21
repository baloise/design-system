import { Component, h, ComponentInterface, Host, Prop, Event, EventEmitter } from '@stencil/core'
import { stopEventBubbling } from '../../../utils/form-input'
import { BEM } from '../../../utils/bem'
import { ariaBooleanToString } from 'packages/core/src/utils/aria'

@Component({
  tag: 'bal-date-calendar-cell',
  shadow: false,
})
export class DateCalendarCell implements ComponentInterface {
  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  @Prop() day?: number
  @Prop() month?: number
  @Prop() year?: number
  @Prop() isoDate!: string
  @Prop() fullDate!: string
  @Prop() selected = false
  @Prop() today = false
  @Prop() disabled = false

  /**
   * Emitted when a option got selected.
   */
  @Event() balSelectDay!: EventEmitter<BalEvents.BalDateCellSelectDetail>

  /**
   * EVENT BINDING
   * ------------------------------------------------------
   */

  private onClick = (ev: MouseEvent, selectedDate: string): void => {
    if (!this.disabled) {
      this.balSelectDay.emit(selectedDate)
    } else {
      stopEventBubbling(ev)
    }
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const block = BEM.block('date-calendar-cell')

    return (
      <Host
        class={{
          ...block.class(),
          ...block.modifier('today').class(!this.disabled && this.today),
          ...block.modifier('selected').class(!this.disabled && this.selected),
          ...block.modifier('disabled').class(this.disabled === true),
        }}
        tabIndex={-1}
        type="button"
        role="button"
        aria-label={this.fullDate}
        aria-selected={ariaBooleanToString(this.selected)}
        aria-disabled={ariaBooleanToString(this.disabled)}
        title={this.fullDate}
        onClick={(ev: MouseEvent) => this.onClick(ev, this.isoDate)}
      >
        <time dateTime={this.isoDate}>{this.day}</time>
      </Host>
    )
  }
}
