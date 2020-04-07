import { Component, Event, EventEmitter, h, Host, Prop, State, Watch } from "@stencil/core";

@Component({
  tag: "bal-timeinput",
  styleUrl: "timeinput.scss",
  shadow: true,
})
export class Timeinput {
  static readonly CLOCK_PATTERN = /^([0-9]{1,2}):([0-9]{1,2})$/;
  static readonly POS_NUM_PATTERN = /^([0-9]{0,2})$/;

  static readonly ZERO = 0;
  static readonly MAX_HOUR = 23;
  static readonly MAX_MINUTE = 59;

  timeoutHandler: NodeJS.Timeout = undefined;

  @State() isPristine = true;
  @State() hour: number;
  @State() minute: number;

  /**
   * If `true` the button is disabled
   */
  @Prop() disabled: boolean;

  /**
   * The value of the datepicker with the format `hh:mm`.
   */
  @Prop({ mutable: true }) value: string = "";

  /**
   * Emitted when either the hour or the minute input has changed.
   * It will always return a valid number.
   */
  @Event() balInput!: EventEmitter<string>;

  /**
   * Emitted when either the hour or minute input field loses focus.
   */
  @Event({
    composed: true,
    cancelable: false,
    bubbles: false,
  }) balBlur!: EventEmitter<void>;

  @Watch("value")
  valueWatcher(newValue: string) {
    this.parseValue(newValue);
  }

  componentWillLoad() {
    if (this.value) {
      this.parseValue(this.value);
    }
  }

  private parseValue(value: string) {
    this.isPristine = false;
    const matches = Timeinput.CLOCK_PATTERN.exec(value);
    if (matches !== null) {
      this.hour = Math.min(Timeinput.MAX_HOUR, parseInt(matches[1], 10));
      this.minute = Math.min(Timeinput.MAX_MINUTE, parseInt(matches[2], 10));
      return;
    }
    this.hour = undefined;
    this.minute = undefined;
  }

  private incHour(): boolean {
    if(this.hour >= Timeinput.MAX_HOUR) {
      return false;
    }
    this.hour = (this.hour ?? Timeinput.ZERO) + 1;
    this.emitValueChange();
    return true;
  }

  private decHour(): boolean {
    if(this.hour <= Timeinput.ZERO) {
      return false;
    }
    this.hour = (this.hour ?? Timeinput.ZERO) - 1;
    this.emitValueChange();
    return true;
  }

  private incMinute(): boolean {
    if(this.minute >= Timeinput.MAX_MINUTE) {
      return false;
    }
    this.minute = (this.minute ?? Timeinput.ZERO) + 1;
    this.emitValueChange();
    return true;
  }

  private decMinute(): boolean {
    if(this.minute <= Timeinput.ZERO) {
      return false;
    }
    this.minute = (this.minute ?? Timeinput.ZERO) - 1;
    this.emitValueChange();
    return true;
  }

  private isPrintable(event: KeyboardEvent) {
    return event.code !== event.key && event.key.length === 1;
  }

  private preventIllegalKeyboardEvent(event: KeyboardEvent, max: number) {
    if (!this.isPrintable(event)) {
      return;
    }

    const inputElem = event.target as HTMLInputElement;
    const simulatedValue = this.simulateEventConsumption(inputElem, event);
    const simulatedIntValue = parseInt(simulatedValue, 10);

    if (!Timeinput.POS_NUM_PATTERN.test(simulatedValue)
        || isNaN(simulatedIntValue)
        || simulatedIntValue < Timeinput.ZERO
        || simulatedIntValue > max) {
      event.preventDefault();
      return;
    }
  }

  private simulateEventConsumption(inputElem: HTMLInputElement, event: KeyboardEvent) {
    return inputElem.value.slice(0, inputElem.selectionStart) + event.key + inputElem.value.slice(inputElem.selectionEnd);
  }

  async onHourInput(event: InputEvent) {
    const inputValue = (event.target as HTMLInputElement).value;
    const val = parseInt(inputValue, 10);
    this.hour = isNaN(val) ? undefined : val;
    this.emitValueChange();
  }

  async onMinuteInput(event: InputEvent) {
    const inputValue = (event.target as HTMLInputElement).value;
    const val = parseInt(inputValue, 10);
    this.minute = isNaN(val) ? undefined : val;
    this.emitValueChange();
  }

  private async onHourKeyDown(event: KeyboardEvent) {
    this.preventIllegalKeyboardEvent(event, Timeinput.MAX_HOUR);
  }

  private async onMinuteKeyDown(event: KeyboardEvent) {
    this.preventIllegalKeyboardEvent(event, Timeinput.MAX_MINUTE);
  }

  repeatOnHold(action: () => boolean, start = 500, speedup = 1.5) {
    const canContinue = action();
    if(!canContinue) {
      this.onMouseLeafOrUp();
      return;
    }
    this.timeoutHandler = setTimeout(() => this.repeatOnHold(action, start / speedup, speedup), start);
  }

  onMouseLeafOrUp() {
    if(this.timeoutHandler !== undefined) {
      clearTimeout(this.timeoutHandler);
      this.timeoutHandler = undefined;
      this.balBlur.emit();
    }
  }

  emitValueChange() {
    this.value = (this.hour ?? "00")  + ":" + (this.minute ?? "00");
    this.balInput.emit(this.value);
  }

  render() {
    return (
      <Host>
        <div class="stepper">
          <button
            class="stepper-btn"
            onMouseDown={() => this.repeatOnHold(() => this.incHour())}
            onMouseUp={() => this.onMouseLeafOrUp()}
            onMouseLeave={() => this.onMouseLeafOrUp()}
            disabled={this.disabled || this.hour >= Timeinput.MAX_HOUR}
            tabindex="-1">
            <svg width="30px" height="24px" version="1.1">
              <g transform="rotate(-90 15,14.500000000000002)" fill="none">
                <g stroke="none'" stroke-width="1" fill="none">
                  <g stroke-width="2" stroke="#003399">
                    <polyline points="13.0119753 11 17 14.5108358 13 18">
                    </polyline>
                  </g>
                </g>
              </g>
            </svg>
          </button>
          <input
            class="input time-box"
            placeholder="00"
            value={this.hour}
            onInput={this.onHourInput.bind(this)}
            onBlur={this.balBlur.emit.bind(this)}
            onKeyDown={this.onHourKeyDown.bind(this)}
            disabled={this.disabled}>
          </input>
          <button
            class="stepper-btn"
            onMouseDown={() => this.repeatOnHold(() => this.decHour())}
            onMouseUp={() => this.onMouseLeafOrUp()}
            onMouseLeave={() => this.onMouseLeafOrUp()}
            disabled={this.disabled || this.hour <= Timeinput.ZERO || this.hour === undefined}
            tabindex="-1">
            <svg width="30px" height="24px" version="1.1">
              <g transform="rotate(90 15,14.500000000000002)" fill="none">
                <g stroke="none'" stroke-width="1" fill="none">
                  <g stroke-width="2" stroke="#003399">
                    <polyline points="13.0119753 11 17 14.5108358 13 18">
                    </polyline>
                  </g>
                </g>
              </g>
            </svg>
          </button>
        </div>
        <div class="time-divider" />
        <div class="stepper">
          <button
            class="stepper-btn"
            onMouseDown={() => this.repeatOnHold(() => this.incMinute())}
            onMouseUp={() => this.onMouseLeafOrUp()}
            onMouseLeave={() => this.onMouseLeafOrUp()}
            disabled={this.disabled || this.minute >= Timeinput.MAX_MINUTE}
            tabindex="-1">
            <svg width="30px" height="24px" version="1.1">
              <g transform="rotate(-90 15,14.500000000000002)" fill="none">
                <g stroke="none'" stroke-width="1" fill="none">
                  <g stroke-width="2" stroke="#003399">
                    <polyline points="13.0119753 11 17 14.5108358 13 18">
                    </polyline>
                  </g>
                </g>
              </g>
            </svg>
          </button>
          <input
            class="input time-box"
            placeholder="00"
            value={this.minute}
            onInput={this.onMinuteInput.bind(this)}
            onBlur={this.balBlur.emit.bind(this)}
            onKeyDown={this.onMinuteKeyDown.bind(this)}
            disabled={this.disabled}>
          </input>
          <button
            class="stepper-btn"
            onMouseDown={() => this.repeatOnHold(() => this.decMinute())}
            onMouseUp={() => this.onMouseLeafOrUp()}
            onMouseLeave={() => this.onMouseLeafOrUp()}
            disabled={this.disabled || this.minute <= Timeinput.ZERO || this.minute === undefined}
            tabindex="-1">
            <svg width="30px" height="24px" version="1.1">
              <g transform="rotate(90 15,14.500000000000002)" fill="none">
                <g stroke="none'" stroke-width="1" fill="none">
                  <g stroke-width="2" stroke="#003399">
                    <polyline points="13.0119753 11 17 14.5108358 13 18">
                    </polyline>
                  </g>
                </g>
              </g>
            </svg>
          </button>
        </div>
      </Host>
    );
  }
}
