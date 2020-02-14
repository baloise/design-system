import { Component, Host, h, State, Prop, Watch, Event, EventEmitter, Method } from "@stencil/core";
import moment from "moment";
import { i18n } from "./i18n";

moment.updateLocale("it", i18n.it);
moment.updateLocale("fr", i18n.fr);
moment.updateLocale("en", i18n.en);
moment.updateLocale("de", i18n.de);

interface CalendarCell {
  date: moment.Moment;
  label: string;
  dateString: string;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  isOutdated: boolean;
}

export type TimeCallback = (date: string) => boolean;

@Component({
  tag: "bal-timepicker",
  styleUrl: "timepicker.scss",
})
export class Timepicker {
  static FORMAT = "HH:mm";

  dropDownElement!: HTMLBalDropdownElement;
  now: moment.Moment = moment().startOf("hour");

  @State() isPristine = true;
  @State() selectedTime: moment.Moment = moment().startOf("hour");
  @State() pointerTime: moment.Moment = moment().startOf("hour");

  /**
   * Language of the timepicker. Possible values are `de`, `fr`,`it` or `en`.
   */
  @Prop() language: string = "de";

  /**
   * Placeholder text to render if no time has been selected.
   */
  @Prop() placeholder: string = "Click to select...";

  /**
   * Disable the input
   */
  @Prop() disabled: boolean = false;

  /**
   * Latest time available for selection
   */
  @Prop() maxTime: string = "";

  /**
   * Earliest time available for selection
   */
  @Prop() minTime: string = "";

  /**
   * The value of the timepicker with the format `HH:mm`.
   */
  @Prop({ mutable: true }) value: string = "";

  @Watch("value")
  valueWatcher(newValue: string) {
    this.isPristine = false;
    this.selectedTime = moment(newValue, Timepicker.FORMAT);
    this.pointerTime = moment(newValue, Timepicker.FORMAT);
  }

  /**
   * Callback to determine which time in the timepicker should be selectable.
   */
  @Prop() filter: TimeCallback = (_) => true;

  /**
   * Triggers when the value of the timepicker is changed
   */
  @Event({
    eventName: "balChange",
    composed: true,
    cancelable: true,
    bubbles: true,
  }) balChangeEventEmitter!: EventEmitter<string>;

  componentWillLoad() {
    moment.locale(this.language);
    if (this.value) {
      this.isPristine = false;
      this.selectedTime = moment(this.value, Timepicker.FORMAT);
      this.pointerTime = moment(this.value, Timepicker.FORMAT);
    }
  }

  /**
   * Open the timepicker dropdown
   */
  @Method()
  async open() {
    await this.dropDownElement.open();
  }

  /**
   * Close the timepicker dropdown
   */
  @Method()
  async close() {
    await this.dropDownElement.close();
  }

  get weekdays(): string[] {
    const arr: string[] = moment.weekdaysMin();
    arr.push(arr.shift() as any);
    return arr;
  }

  get parsedMaxTime(): moment.Moment {
    return moment(this.maxTime, Timepicker.FORMAT).startOf("hour");
  }

  get parsedMinTime(): moment.Moment {
    return moment(this.minTime, Timepicker.FORMAT).startOf("hour");
  }

  get firstDateOfBox(): moment.Moment {
    return moment(this.pointerTime).startOf("day");
  }

  get calendarGrid(): CalendarCell[][] {
    let hourPointer = this.firstDateOfBox;
    let calendar = [];
    do {
      let row = [];
      do {
        row = [...row, {
          date: moment(hourPointer),
          dateString: hourPointer.format(Timepicker.FORMAT),
          label: hourPointer.format(Timepicker.FORMAT),
          isToday: this.now.isSame(hourPointer),
          isSelected: !this.isPristine && this.selectedTime.isSame(hourPointer),
          isDisabled: !this.filter(hourPointer.format(Timepicker.FORMAT)),
          isOutdated: (this.minTime && hourPointer < this.parsedMinTime)
            || (this.maxTime && hourPointer > this.parsedMaxTime),
        } as CalendarCell];
        hourPointer = moment(hourPointer.add(1, "hour"));
      } while (row.length < 4);
      calendar = [...calendar, row];
    } while (this.pointerTime.isSame(hourPointer, "day"));

    return calendar;
  }

  private async selectDate(cell: CalendarCell) {
    if (!cell.isDisabled && !cell.isOutdated) {
      this.isPristine = false;
      this.selectedTime = moment(cell.date);
      this.pointerTime = moment(cell.date);
      this.balChangeEventEmitter.emit(this.selectedTime.format(Timepicker.FORMAT));
      this.value = this.selectedTime.format(Timepicker.FORMAT);
      await this.close();
    }
  }

  render() {
    return (
      <Host>
        <div class="timepicker control">
          <bal-dropdown expanded
            fixed={false}
            value={{ value: this.value, label: this.value }}
            readonly={true}
            disabled={this.disabled}
            placeholder={this.placeholder}
            triggerIcon={"clock"}
            ref={el => this.dropDownElement = el as HTMLBalDropdownElement}>
            <div class="timepicker-popup">
              <header class="timepicker-header">
                <div class="field is-centered">
                  <div class="field">
                    <div class="control timepicker-label"><span>
                      Timepicker
                      </span></div>
                  </div>
                </div>
              </header>
              <div class="timepicker-content">
                <section class="timepicker-table">
                  <div class="timepicker-body">
                    {this.calendarGrid.map(row =>
                      <div class="timepicker-row">
                        {row.map(cell =>
                          <div onClick={() => this.selectDate(cell)} data-date={cell.dateString} class={[
                            "timepicker-cell",
                            cell.isToday ? "is-today" : "",
                            cell.isSelected ? "is-selected" : "",
                            cell.isOutdated ? "is-outdated" : "",
                            cell.isDisabled ? "is-disabled" : "",
                          ].join(" ")}>
                            {cell.label}
                          </div>,
                        )}
                      </div>,
                    )}
                  </div>
                </section>
              </div>
            </div>
          </bal-dropdown>
        </div>
      </Host>
    );
  }

}
