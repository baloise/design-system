import { Component, h, ComponentInterface, Host, Prop, Event, EventEmitter } from '@stencil/core'
import { stopEventBubbling } from '../../../../utils/form-input'

@Component({
  tag: 'bal-date-calendar-cell',
  shadow: false,
})
export class DateCalendar implements ComponentInterface {
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
    return (
      <Host
        class={{
          'day-cell': true,
          'button': true,
          'button--today': this.today,
          'button--selected': this.selected,
          'button--disabled': this.disabled,
        }}
        tabIndex={-1}
        type="button"
        role="button"
        aria-label={this.fullDate}
        title={this.fullDate}
        onClick={(ev: MouseEvent) => this.onClick(ev, this.isoDate)}
      >
        <time dateTime={this.isoDate}>{this.day}</time>
      </Host>
    )
  }
}
