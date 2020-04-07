import { Component, Host, h, State, Prop, Watch, Event, EventEmitter, Method } from "@stencil/core";
import { DateCallback } from "../datepicker/datepicker";

@Component({
  tag: "bal-datetimepicker",
  styleUrl: "datetimepicker.scss"
})
export class Datetimepicker {
  static FORMAT = /^([0-9]{2}.[0-9]{2}.[0-9]{4}) ([0-9]{1,2}:[0-9]{2})$/;

  datepickerElement!: HTMLBalDatepickerElement;
  timeinputElement!: HTMLBalTimeinputElement;

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
  @Prop() maxDate: string = "";

  /**
   * Earliest date available for selection
   */
  @Prop() minDate: string = "";

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
   * Callback to determine which date in the timepicke should be selectable.
   */
  @Prop() filter: DateCallback = (_) => true;

  /**
   * Triggers when the value of the timepicke is changed
   */
  @Event({
    eventName: "balChange",
    composed: true,
    cancelable: true,
    bubbles: true,
  }) balChangeEventEmitter!: EventEmitter<string>;

  @Watch("value")
  valueWatcher(newValue: string) {
    this.parseValue(newValue);
  }

  componentWillLoad() {
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

  private parseValue(value: string) {
    this.isPristine = false;
    const matches = Datetimepicker.FORMAT.exec(value);
    if (matches !== null) {
      this.date = matches[1];
      this.time = matches[2];
    }
  }

  private async selectDate(event: CustomEvent<string>) {
    this.date = event.detail;
    this.emitValue();
  }

  private async changeTime(event: CustomEvent<string>) {
    this.time = event.detail;
    this.emitValue();
  }

  private emitValue() {
    this.balChangeEventEmitter.emit(this.date + " " + this.time);
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
          filter={this.filter}
          onBalChange={this.selectDate.bind(this)}
          ref={el => this.datepickerElement = el as HTMLBalDatepickerElement}>
          <div class="bal-datetimepicker-panel">
            <bal-button type="is-info" size="is-small" is-square outlined>
              <bal-icon name="close-big" size="medium"></bal-icon>
            </bal-button>
            <bal-timeinput class="bal-datetimepicker-timeinput"
              value={this.time}
              disabled={this.disabled}
              onBalInput={this.changeTime.bind(this)}
              ref={el => this.timeinputElement = el as HTMLBalTimeinputElement}>
            </bal-timeinput>
            <bal-button type="is-info" size="is-small" is-square outlined>
              <bal-icon name="check" size="medium"></bal-icon>
            </bal-button>
          </div>
        </bal-datepicker>
      </Host>
    );
  }

}
