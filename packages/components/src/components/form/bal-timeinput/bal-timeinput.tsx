import { Component, Event, EventEmitter, h, Host, Prop, State, Watch } from '@stencil/core'
import { BalTimeSelectionOption } from './bal-timeinput-select-option.type'

@Component({
  tag: 'bal-timeinput',
})
export class Timeinput {
  static readonly CLOCK_PATTERN = /^([0-9]{1,2}):([0-9]{1,2})$/
  static readonly POS_NUM_PATTERN = /^([0-9]{0,2})$/

  static readonly ZERO = 0
  static readonly MAX_HOUR = 23
  static readonly MAX_MINUTE = 59

  timeoutHandler: NodeJS.Timeout | undefined

  @State() isPristine = true
  @State() hour?: number = 0
  @State() minute?: number = 0

  @State() minHour: number = Timeinput.ZERO
  @State() minMinute: number = Timeinput.ZERO
  currentMinMinute: number = Timeinput.ZERO

  @State() maxHour: number = Timeinput.MAX_HOUR
  @State() maxMinute: number = Timeinput.MAX_MINUTE
  currentMaxMinute: number = Timeinput.MAX_MINUTE

  /**
   * If `true` the button is disabled
   */
  @Prop() disabled = false

  /**
   * The value of the datepicker with the format `hh:mm`.
   */
  @Prop({ mutable: true }) value = ''

  /**
   * Latest date available for selection
   */
  @Prop() maxTime = ''

  /**
   * Earliest date available for selection
   */
  @Prop() minTime = ''

  /**
   * If `true` the timeinput can be used on blue background.
   */
  @Prop() inverted = false

  /**
   * Emitted when either the hour or the minute input has changed.
   * It will not be triggert if either hour or time input has never been set (i.e. "--" is selected).
   */
  @Event({ eventName: 'balChange' }) balTimeinputChange!: EventEmitter<string>

  /**
   * Emitted when either the hour or minute input field loses focus.
   */
  @Event() balBlur!: EventEmitter<FocusEvent>

  @Watch('value')
  valueWatcher(newValue: string) {
    this.parseValue(newValue)
  }

  @Watch('maxTime')
  maxTimeWatcher(newValue: string) {
    this.parseMaxTime(newValue)
  }

  @Watch('minTime')
  minTimeWatcher(newValue: string) {
    this.parseMinTime(newValue)
  }

  componentWillLoad() {
    if (this.maxTime) {
      this.parseMaxTime(this.maxTime)
    }
    if (this.minTime) {
      this.parseMinTime(this.minTime)
    }
    if (this.value) {
      this.parseValue(this.value)
    }
  }

  private parseMaxTime(value: string) {
    const maxMatch = Timeinput.CLOCK_PATTERN.exec(value)
    if (maxMatch !== null) {
      this.maxHour = Math.min(Timeinput.MAX_HOUR, parseInt(maxMatch[1], 10))
      this.maxMinute = Math.min(Timeinput.MAX_MINUTE, parseInt(maxMatch[2], 10))
      this.minHour = Math.min(this.maxHour, this.minHour)
      this.updateCurrentMinuteBound()
      return
    }
    this.maxHour = Timeinput.MAX_HOUR
    this.maxMinute = Timeinput.MAX_MINUTE
    this.currentMaxMinute = Timeinput.MAX_MINUTE
  }

  private parseMinTime(value: string) {
    const minMatch = Timeinput.CLOCK_PATTERN.exec(value)
    if (minMatch !== null) {
      this.minHour = Math.min(this.maxHour, parseInt(minMatch[1], 10))
      this.minMinute = Math.min(Timeinput.MAX_MINUTE, parseInt(minMatch[2], 10))
      this.maxHour = Math.max(this.maxHour, this.minHour)
      this.updateCurrentMinuteBound()
      return
    }
    this.minHour = Timeinput.ZERO
    this.minMinute = Timeinput.ZERO
    this.currentMinMinute = Timeinput.ZERO
  }

  private parseValue(value: string) {
    this.isPristine = false
    const valueMatch = Timeinput.CLOCK_PATTERN.exec(value)
    if (valueMatch !== null) {
      this.hour = Math.min(this.maxHour, Math.max(this.minHour, parseInt(valueMatch[1], 10)))
      this.updateCurrentMinuteBound()
      this.minute = Math.min(this.currentMaxMinute, Math.max(this.currentMinMinute, parseInt(valueMatch[2], 10)))
      return
    }
    this.hour = undefined
    this.minute = undefined
  }

  private updateCurrentMinuteBound() {
    this.currentMinMinute = Timeinput.ZERO
    this.currentMaxMinute = Timeinput.MAX_MINUTE
    if (this.hour === this.maxHour) {
      this.currentMaxMinute = this.maxMinute
    }
    if (this.hour === this.minHour) {
      this.currentMinMinute = this.minMinute
    }
  }

  private incHour(): boolean {
    if (this.hour !== undefined && this.hour >= this.maxHour) {
      return false
    }
    this.hour = (this.hour ?? this.minHour) + 1
    this.updateCurrentMinuteBound()
    this.onValueChange()
    return true
  }

  private decHour(): boolean {
    if (this.hour !== undefined && this.hour <= this.minHour) {
      return false
    }
    this.hour = (this.hour ?? this.minHour) - 1
    this.updateCurrentMinuteBound()
    this.onValueChange()
    return true
  }

  private incMinute(): boolean {
    if (this.minute !== undefined && this.minute >= this.currentMaxMinute) {
      return false
    }
    this.minute = (this.minute ?? this.currentMinMinute) + 1
    this.onValueChange()
    return true
  }

  private decMinute(): boolean {
    if (this.minute !== undefined && this.minute <= this.currentMinMinute) {
      return false
    }
    this.minute = (this.minute ?? this.currentMinMinute) - 1
    this.onValueChange()
    return true
  }

  private onHourChange = async (event: Event) => {
    const inputValue = (event.target as HTMLInputElement).value
    const val = parseInt(inputValue, 10)
    this.hour = isNaN(val) ? undefined : val
    this.updateCurrentMinuteBound()
    this.onValueChange()
  }

  private onMinuteChange = async (event: Event) => {
    const inputValue = (event.target as HTMLInputElement).value
    const val = parseInt(inputValue, 10)
    this.minute = isNaN(val) ? undefined : val
    this.onValueChange()
  }

  private repeatOnHold(action: () => boolean, start = 500, speedup = 1.5) {
    const canContinue = action()
    if (!canContinue) {
      this.onMouseLeafOrUp()
      return
    }
    this.timeoutHandler = setTimeout(() => this.repeatOnHold(action, start / speedup, speedup), start)
  }

  private onMouseLeafOrUp() {
    if (this.timeoutHandler !== undefined) {
      clearTimeout(this.timeoutHandler)
      this.timeoutHandler = undefined
      this.balBlur.emit()
    }
  }

  private onValueChange() {
    if (this.hour !== undefined && this.minute !== undefined) {
      this.minute = Math.min(this.currentMaxMinute, Math.max(this.currentMinMinute, this.minute))
      this.value = Timeinput.formatTimeBoxValue(this.hour) + ':' + Timeinput.formatTimeBoxValue(this.minute)
      this.balTimeinputChange.emit(this.value)
    }
  }

  get hourOptions(): BalTimeSelectionOption[] {
    const options = []
    for (const i of Array.from(Array(Timeinput.MAX_HOUR + 1).keys())) {
      options.push({
        value: Timeinput.formatTimeBoxValue(i),
        disabled: i < this.minHour || i > this.maxHour,
      })
    }
    return options
  }

  get minuteOptions(): BalTimeSelectionOption[] {
    const options = []
    for (const i of Array.from(Array(Timeinput.MAX_MINUTE + 1).keys())) {
      options.push({
        value: Timeinput.formatTimeBoxValue(i),
        disabled:
          this.hour !== undefined &&
          ((this.hour === this.minHour && i < this.minMinute) || (this.hour === this.maxHour && i > this.maxMinute)),
      })
    }
    return options
  }

  static formatTimeBoxValue(val: number | undefined): string {
    if (val === undefined) {
      return ''
    }

    return val.toString().padStart(2, '0')
  }

  render() {
    return (
      <Host>
        <div class={['stepper', this.inverted ? 'is-inverted' : ''].join(' ')}>
          <button
            type="button"
            class="stepper-btn"
            onMouseDown={() => this.repeatOnHold(() => this.incHour())}
            onMouseUp={() => this.onMouseLeafOrUp()}
            onMouseLeave={() => this.onMouseLeafOrUp()}
            disabled={this.disabled || (this.hour !== undefined && this.hour >= this.maxHour)}
            tabindex="-1"
          >
            <svg width="15px" height="10px" version="1.1">
              <g stroke-width="3.25" fill="none" stroke={this.inverted ? '#ffffff' : '#003399'}>
                <polyline points="2,8 7.5,2 13,8"></polyline>
              </g>
            </svg>
          </button>
          <select
            class="input time-box"
            onBlur={ev => this.balBlur.emit(ev)}
            onChange={this.onHourChange}
            disabled={this.disabled}
          >
            <option value="" disabled selected={this.hour === undefined}>
              --
            </option>
            {this.hourOptions.map(hourOption => (
              <option
                selected={hourOption.value === Timeinput.formatTimeBoxValue(this.hour)}
                disabled={hourOption.disabled}
                value={hourOption.value}
              >
                {hourOption.value}
              </option>
            ))}
          </select>
          <button
            type="button"
            class="stepper-btn"
            onMouseDown={() => this.repeatOnHold(() => this.decHour())}
            onMouseUp={() => this.onMouseLeafOrUp()}
            onMouseLeave={() => this.onMouseLeafOrUp()}
            disabled={
              this.disabled || (this.hour !== undefined && this.hour <= this.minHour) || this.hour === undefined
            }
            tabindex="-1"
          >
            <svg width="15px" height="10px" version="1.1">
              <g stroke-width="3.25" fill="none" stroke={this.inverted ? '#ffffff' : '#003399'}>
                <polyline points="2,2 7.5,8 13,2"></polyline>
              </g>
            </svg>
          </button>
        </div>
        <div class={['time-divider', this.inverted ? 'is-inverted' : ''].join(' ')} />
        <div class="stepper">
          <button
            type="button"
            class="stepper-btn"
            onMouseDown={() => this.repeatOnHold(() => this.incMinute())}
            onMouseUp={() => this.onMouseLeafOrUp()}
            onMouseLeave={() => this.onMouseLeafOrUp()}
            disabled={this.disabled || (this.minute !== undefined && this.minute >= this.currentMaxMinute)}
            tabindex="-1"
          >
            <svg width="15px" height="10px" version="1.1">
              <g stroke-width="3.25" fill="none" stroke={this.inverted ? '#ffffff' : '#003399'}>
                <polyline points="2,8 7.5,2 13,8"></polyline>
              </g>
            </svg>
          </button>
          <select
            class="time-box"
            onBlur={ev => this.balBlur.emit(ev)}
            onChange={this.onMinuteChange}
            disabled={this.disabled}
          >
            <option value="" disabled selected={this.minute === undefined}>
              --
            </option>
            {this.minuteOptions.map(minuteOption => (
              <option
                selected={minuteOption.value === Timeinput.formatTimeBoxValue(this.minute)}
                disabled={minuteOption.disabled}
                value={minuteOption.value}
              >
                {minuteOption.value}
              </option>
            ))}
          </select>
          <button
            type="button"
            class="stepper-btn"
            onMouseDown={() => this.repeatOnHold(() => this.decMinute())}
            onMouseUp={() => this.onMouseLeafOrUp()}
            onMouseLeave={() => this.onMouseLeafOrUp()}
            disabled={
              this.disabled ||
              (this.minute !== undefined && this.minute <= this.currentMinMinute) ||
              this.minute === undefined
            }
            tabindex="-1"
          >
            <svg width="15px" height="10px" version="1.1">
              <g stroke-width="3.25" fill="none" stroke={this.inverted ? '#ffffff' : '#003399'}>
                <polyline points="2,2 7.5,8 13,2"></polyline>
              </g>
            </svg>
          </button>
        </div>
      </Host>
    )
  }
}
