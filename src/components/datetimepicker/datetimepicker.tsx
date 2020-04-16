import { Component, Host, h, Listen, State, Prop, Watch, Event, EventEmitter, Method } from "@stencil/core";
import { DateCallback } from "../datepicker/datepicker";
import { Timeinput } from "../timeinput/timeinput";

@Component({
  tag: "bal-datetimepicker",
  styleUrl: "datetimepicker.scss"
})
export class Datetimepicker {
  static FORMAT = /^([0-9]{2}.[0-9]{2}.[0-9]{4}) ([0-9]{1,2}:[0-9]{1,2})$/;

  datepickerElement!: HTMLBalDatepickerElement;
  timeinputElement!: HTMLBalTimeinputElement;
  saveButtonElement!: HTMLBalButtonElement;

  @State() isPristine = true;
  @State() date: string;
  @State() time: string;

  /**
   * Placeholder text to render if no date has been selected.
   */
  @Prop() placeholder: string = "Click to select...";

  /**
   * Disable the input
   */
  @Prop() disabled: boolean = false;

  /**
   * Latest date available for selection
   */
  @Prop() maxDatetime: string = "";
  maxDate = "";
  maxTime = "";
  currentMaxTime = "";

  /**
   * Earliest datetime available for selection
   */
  @Prop() minDatetime: string = "";
  minDate = "";
  minTime = "";
  currentMinTime = "";

  /**
   * Latest year available for selection
   */
  @Prop() maxYear: string = "";

  /**
   * Earliest year available for selection
   */
  @Prop() minYear: string = "";

  /**
   * The value of the timepicke with the format `dd.MM.yyyy`.
   */
  @Prop({ mutable: true }) value: string = "";

  /**
   * Callback to determine which date in the datetimepicker should be selectable.
   */
  @Prop() dateFilter: DateCallback = (_) => true;

  /**
   * Triggers when the value of the timepicke is changed
   */
  @Event({
    composed: true,
    cancelable: true,
    bubbles: true,
  }) balDatetimeChange!: EventEmitter<string>;

  /**
   * Emitted when the toggle loses focus.
   */
  @Event({
    composed: true,
    cancelable: false,
    bubbles: false,
  }) balBlur!: EventEmitter<void>;

  @Watch("minDatetime")
  minDatetimeWatcher(newValue: string) {
    this.parseMinDatetime(newValue);
  }

  @Watch("maxDatetime")
  maxDatetimeWatcher(newValue: string) {
    this.parseMaxDatetime(newValue);
  }


  @Watch("value")
  valueWatcher(newValue: string) {
    this.parseValue(newValue);
  }

  componentWillLoad() {
    if (this.minDatetime) {
      this.parseMinDatetime(this.minDatetime);
    }
    if (this.maxDatetime) {
      this.parseMaxDatetime(this.maxDatetime);
    }
    if (this.value) {
      this.parseValue(this.value);
    }
  }

  /**
   * Open the timepicke dropdown
   */
  @Method()
  async open() {
    await this.datepickerElement.open();
  }

  /**
   * Close the timepicke dropdown
   */
  @Method()
  async close() {
    await this.datepickerElement.close();
  }

  private parseMinDatetime(value: string) {
    const minMatch = Datetimepicker.FORMAT.exec(value);
    if (minMatch !== null) {
      this.minDate = minMatch[1];
      this.minTime = minMatch[2];
      this.updateCurrenTimeBound();
      return;
    }
    this.minDate = "";
    this.minTime = "";
  }

  private parseMaxDatetime(value: string) {
    const maxMatch = Datetimepicker.FORMAT.exec(value);
    if (maxMatch !== null) {
      this.maxDate = maxMatch[1];
      this.maxTime = maxMatch[2];
      this.updateCurrenTimeBound();
      return;
    }
    this.maxDate = "";
    this.maxTime = "";
  }

  private parseValue(value: string) {
    this.isPristine = false;
    const matches = Datetimepicker.FORMAT.exec(value);
    if (matches !== null) {
      this.date = matches[1];
      this.time = matches[2];
      this.updateCurrenTimeBound();
      return;
    }
    this.date = undefined;
    this.time = undefined;
  }

  private async selectDate(event: CustomEvent<string>) {
    this.date = event.detail;
    this.updateCurrenTimeBound();
  }

  private async changeTime(event: CustomEvent<string>) {
    this.time = event.detail;
  }

  private save() {
    this.value = Datetimepicker.formatValue(this.date, this.time);
    this.balDatetimeChange.emit(this.value);
    this.datepickerElement.close();
  }

  private abort() {
    this.parseValue(this.value);
    this.datepickerElement.close();
  }

  private async onBlur() {
    this.parseValue(this.value);
    this.balBlur.emit();
  }

  private updateCurrenTimeBound() {
    this.currentMinTime = "00:00";
    this.currentMaxTime = "23:59";
    if (this.date === this.minDate) {
      this.currentMinTime = this.minTime;
    }
    if (this.date === this.maxDate) {
      this.currentMaxTime = this.maxTime;
    }
    if(this.time !== undefined) {
      const time = this.toSecondCount(this.time);
      const currentMinTime = this.toSecondCount(this.currentMinTime);
      const currentMaxTime = this.toSecondCount(this.currentMaxTime);
      this.time = this.toClockString(Math.min(currentMaxTime, Math.max(currentMinTime, time)));
    }
  }

  private toSecondCount(val: string): number {
    const timeMatch = Timeinput.CLOCK_PATTERN.exec(val);
    if (timeMatch === null) {
      return 0;
    }
    const hour = parseInt(timeMatch[1], 10);
    const minute = parseInt(timeMatch[2], 10);
    return hour * 60 + minute;
  }

  private toClockString(val: number): string {
    return Timeinput.formatTimeBoxValue(Math.floor(val/60)) + ":" + Timeinput.formatTimeBoxValue(val % 60);
  }

  private formatDatepickerLabel(date: string) {
    if (date !== undefined && date !== "" && this.time !== undefined) {
       return Datetimepicker.formatValue(date, this.time);
    }
    if (date !== undefined) {
      return date;
    }
    return this.time;
  }

  private static formatValue(date: string, time: string) {
    return date + " " + time;
  }

  private canSave() {
    return this.date !== undefined && this.time !== undefined;
  }

  @Listen("keydown")
  onKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      if (this.canSave()) {
        this.save();
        return;
      }
      this.abort();
    }
    if(event.key === "ESC") {
      this.abort();
    }
  }

  render() {
    return (
      <Host>
        <bal-datepicker
          value={this.date}
          disabled={this.disabled}
          placeholder={this.placeholder}
          maxDate={this.maxDate}
          minDate={this.minDate}
          maxYear={this.maxYear}
          minYear={this.minYear}
          closeOnSelect={false}
          filter={this.dateFilter}
          formatLabel={this.formatDatepickerLabel.bind(this)}
          onBalChange={this.selectDate.bind(this)}
          onBalBlur={this.onBlur.bind(this)}
          ref={el => this.datepickerElement = el as HTMLBalDatepickerElement}>
          <div class="bal-datetimepicker-panel">
            <bal-button
              disabled={this.disabled}
              onClick={() => this.abort()}
              type="is-info"
              size="is-small"
              is-square outlined>
              <bal-icon name="close-big" size="medium"></bal-icon>
            </bal-button>
            <bal-timeinput class="bal-datetimepicker-timeinput"
              value={this.time}
              minTime={this.currentMinTime}
              maxTime={this.currentMaxTime}
              disabled={this.disabled}
              onBalTimeinputChange={this.changeTime.bind(this)}
              ref={el => this.timeinputElement = el as HTMLBalTimeinputElement}>
            </bal-timeinput>
            <bal-button
              disabled={this.disabled || !this.canSave()}
              onClick={() => this.save()}
              type="is-info"
              size="is-small"
              is-square outlined
              ref={el => this.saveButtonElement = el as HTMLBalButtonElement}>
              <bal-icon name="check" size="medium"></bal-icon>
            </bal-button>
          </div>
        </bal-datepicker>
      </Host>
    );
  }

}
