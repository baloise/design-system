import {Component, Host, h, State, Prop, Watch, Event, EventEmitter, Method} from "@stencil/core";
import moment from "moment";
import {i18n} from "./i18n";

moment.defineLocale("it", i18n.it);
moment.defineLocale("fr", i18n.fr);
moment.defineLocale("en", i18n.en);
moment.defineLocale("de", i18n.de);

interface CalendarCell {
  date: moment.Moment;
  label: string;
  dateString: string;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  isOutdated: boolean;
}

@Component({
  tag: "bal-datepicker",
  styleUrl: "bal-datepicker.scss",
})
export class BalDatepicker {
  static FORMAT = "DD.MM.YYYY";

  inputElement!: HTMLInputElement;
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
  @Prop() value: string = "";

  @Watch("value")
  valueWatcher(newValue: string) {
    this.isPristine = false;
    this.inputElement.value = newValue;
    this.selectedDate = moment(newValue, BalDatepicker.FORMAT);
    this.pointerDate = moment(newValue, BalDatepicker.FORMAT);
  }

  /**
   * Triggers when the value of the datepicker is changed
   */
  @Event({
    eventName: "input",
    composed: true,
    cancelable: true,
    bubbles: true,
  }) inputEventEmitter!: EventEmitter<string>;

  componentWillLoad() {
    moment.locale(this.language);
    if (this.value) {
      this.isPristine = false;
      this.selectedDate = moment(this.value, BalDatepicker.FORMAT);
      this.pointerDate = moment(this.value, BalDatepicker.FORMAT);
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
    return moment(this.maxDate, BalDatepicker.FORMAT).startOf("day");
  }

  get parsedMinDate(): moment.Moment {
    return moment(this.minDate, BalDatepicker.FORMAT).startOf("day");
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
          dateString: dayDatePointer.format(BalDatepicker.FORMAT),
          label: dayDatePointer.date().toString(),
          isToday: this.now.isSame(dayDatePointer),
          isSelected: !this.isPristine && this.selectedDate.isSame(dayDatePointer),
          isDisabled: false,
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
      this.inputEventEmitter.emit(this.selectedDate.format(BalDatepicker.FORMAT));
      this.inputElement.value = this.selectedDate.format(BalDatepicker.FORMAT);
      await this.close();
    }
  }

  render() {
    return (
      <Host>
        <div class="datepicker control">
          <bal-dropdown expanded ref={el => this.dropDownElement = el as HTMLBalDropdownElement}>
            <div slot="trigger" class="control has-icons-right is-clearfix clickable">
              <input type="text"
                     value={this.value}
                     disabled={this.disabled}
                     autocomplete="off"
                     placeholder="Click to select..."
                     readonly="readonly"
                     ref={el => this.inputElement = el as HTMLInputElement}
                     class="input"/>
              <span class="icon is-right">
                <i class="bal-icon-date"></i>
              </span>
            </div>
            <div class="datepicker-popup">
              <header class="datepicker-header">
                <div class="pagination field is-centered">
                  <a role="button"
                     onClick={() => this.previousMonth()}
                     class="pagination-previous">
                    <span class="icon has-text-primary is-large">
                      <i class="bal-icon-nav-go-left"></i>
                    </span>
                  </a>
                  <a role="button"
                     onClick={() => this.nextMonth()}
                     class="pagination-next">
                    <span class="icon has-text-primary is-large">
                      <i class="bal-icon-nav-go-right"></i>
                    </span>
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
