import {Component, Host, h, State, Prop, Watch, Event, EventEmitter, Method} from "@stencil/core";
import moment from "moment";
import {i18n} from "./i18n";

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

export type DateCallback = (date: string) => boolean;

@Component({
  tag: "bal-datepicker",
  styleUrl: "datepicker.scss",
})
export class Datepicker {
  static FORMAT = "DD.MM.YYYY";

  dropDownElement!: HTMLBalDropdownElement;
  now: moment.Moment = moment().startOf("day");

  @State() isPristine = true;
  @State() selectedDate: moment.Moment = moment().startOf("day");
  @State() pointerDate: moment.Moment = moment().startOf("day");

  /**
   * Language of the datepicker. Possible values are `de`, `fr`,`it` or `en`.
   */
  @Prop() language: string = "de";

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
   * The value of the datepicker with the format `dd.MM.yyyy`.
   */
  @Prop({mutable: true}) value: string = "";

  @Watch("value")
  valueWatcher(newValue: string) {
    this.isPristine = false;
    this.selectedDate = moment(newValue, Datepicker.FORMAT);
    this.pointerDate = moment(newValue, Datepicker.FORMAT);
  }

  /**
   * Callback to determine which date in the datepicker should be selectable.
   */
  @Prop() filter: DateCallback = (_) => true;

  /**
   * Triggers when the value of the datepicker is changed
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
      this.selectedDate = moment(this.value, Datepicker.FORMAT);
      this.pointerDate = moment(this.value, Datepicker.FORMAT);
    }
    if (!this.minYear) {
      this.minYear = moment(this.now).subtract(100, "years").year().toString();
    }
    if (!this.maxYear) {
      this.maxYear = moment(this.now).add(100, "years").year().toString();
    }
  }

  /**
   * Open the datepicker dropdown
   */
  @Method()
  async open() {
    await this.dropDownElement.open();
  }

  /**
   * Close the datepicker dropdown
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

  get years(): number[] {
    const years = [];
    for (let year = parseInt(this.minYear, 10); year <= parseInt(this.maxYear, 10); year++) {
      years.push(year);
    }
    return years;
  }

  get parsedMaxDate(): moment.Moment {
    return moment(this.maxDate, Datepicker.FORMAT).startOf("day");
  }

  get parsedMinDate(): moment.Moment {
    return moment(this.minDate, Datepicker.FORMAT).startOf("day");
  }

  get firstDateOfBox(): moment.Moment {
    return moment(this.pointerDate).startOf("month").startOf("isoWeek");
  }

  get calendarGrid(): CalendarCell[][] {
    let weekDatePointer = this.firstDateOfBox;
    let dayDatePointer = this.firstDateOfBox;
    let calendar = [];
    do {
      let row = [];
      do {
        row = [...row, {
          date: moment(dayDatePointer),
          dateString: dayDatePointer.format(Datepicker.FORMAT),
          label: dayDatePointer.date().toString(),
          isToday: this.now.isSame(dayDatePointer),
          isSelected: !this.isPristine && this.selectedDate.isSame(dayDatePointer),
          isDisabled: !this.filter(dayDatePointer.format(Datepicker.FORMAT)),
          isOutdated: !this.pointerDate.isSame(dayDatePointer, "month")
            || (this.minDate && dayDatePointer < this.parsedMinDate)
            || (this.maxDate && dayDatePointer > this.parsedMaxDate),
        } as CalendarCell];
        dayDatePointer = moment(dayDatePointer.add(1, "days"));
      } while (weekDatePointer.isSame(dayDatePointer, "week"));
      calendar = [...calendar, row];
      weekDatePointer = moment(weekDatePointer.add(1, "weeks"));
    } while (this.pointerDate.isSame(dayDatePointer, "month"));

    return calendar;
  }

  private previousMonth() {
    this.pointerDate = moment(this.pointerDate.subtract(1, "months"));
  }

  private nextMonth() {
    this.pointerDate = moment(this.pointerDate.add(1, "months"));
  }

  private handleYearSelect(event: any) {
    this.pointerDate = moment(this.pointerDate.year(event.target.value));
  }

  private handleMonthSelect(event: any) {
    this.pointerDate = moment(this.pointerDate.month(parseInt(event.target.value, 10)));
  }

  private async selectDate(cell: CalendarCell) {
    if (!cell.isDisabled && !cell.isOutdated) {
      this.isPristine = false;
      this.selectedDate = moment(cell.date);
      this.pointerDate = moment(cell.date);
      this.balChangeEventEmitter.emit(this.selectedDate.format(Datepicker.FORMAT));
      this.value = this.selectedDate.format(Datepicker.FORMAT);
      await this.close();
    }
  }

  render() {
    return (
      <Host>
        <div class="datepicker control">
          <bal-dropdown expanded
                        fixed={false}
                        value={{value: this.value, label: this.value}}
                        readonly={true}
                        disabled={this.disabled}
                        placeholder={this.placeholder}
                        triggerIcon={"date"}
                        ref={el => this.dropDownElement = el as HTMLBalDropdownElement}>
            <div class="datepicker-popup">
              <header class="datepicker-header">
                <div class="pagination field is-centered">
                  <a role="button"
                     onClick={() => this.previousMonth()}
                     class="pagination-previous">
                    <bal-icon name="nav-go-left" size="large" />
                  </a>
                  <a role="button"
                     onClick={() => this.nextMonth()}
                     class="pagination-next">
                    <bal-icon name="nav-go-right" size="large" />
                  </a>
                  <div class="pagination-list">
                    <div class="field has-addons">
                      <div class="control month-select"><span class="select">
                        <select onInput={(event) => this.handleMonthSelect(event)}>
                          {moment.months().map((month, index) =>
                            <option value={index}
                                    selected={this.pointerDate.month() === index}>
                              {month}
                            </option>,
                          )}
                        </select>
                      </span></div>
                      <div class="control year-select"><span class="select">
                        <select onInput={(event) => this.handleYearSelect(event)}>
                          {this.years.map((year) =>
                            <option value={year}
                                    selected={this.pointerDate.year() === year}>
                              {year}
                            </option>,
                          )}
                        </select>
                      </span></div>
                    </div>
                  </div>
                </div>
              </header>
              <div class="datepicker-content">
                <section class="datepicker-table">
                  <header class="datepicker-header">
                    {this.weekdays.map((weekday) => <div
                      class="datepicker-cell">{weekday}</div>)}
                  </header>
                  <div class="datepicker-body">
                    {this.calendarGrid.map(row =>
                      <div class="datepicker-row">
                        {row.map(cell =>
                          <div onClick={() => this.selectDate(cell)} data-date={cell.dateString} class={[
                            "datepicker-cell",
                            cell.isToday ? "is-today" : "",
                            cell.isSelected ? "is-selected" : "",
                            cell.isOutdated ? "is-outdated" : "",
                            cell.isDisabled ? "is-disabled" : "",
                            !cell.isOutdated && !cell.isDisabled ? "is-selectable" : "",
                          ].join(" ")}>
                            {cell.label}
                          </div>,
                        )}
                      </div>,
                    )}
                  </div>
                </section>
                <slot />
              </div>
            </div>
          </bal-dropdown>
        </div>
      </Host>
    );
  }

}
