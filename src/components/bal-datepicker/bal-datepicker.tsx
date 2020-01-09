import {Component, Host, h, Element, Prop, Watch, EventEmitter, Event, State, Method} from "@stencil/core";
import {DateTime, Info} from "luxon";

interface CalendarCell {
  date: DateTime;
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
  static FORMAT = "dd.MM.yyyy";

  @Element() element!: HTMLElement;

  inputElement!: HTMLInputElement;
  dropDownElement!: HTMLBalDropdownElement;
  now: DateTime = DateTime.local().startOf("day");

  @State() isPristine = true;
  @State() selectedDate: DateTime = DateTime.local().startOf("day");
  @State() pointerDate: DateTime = DateTime.local().startOf("day");

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
   * The value of the datepicker with the format `dd.MM.yyyy`.
   */
  @Prop() value: string = "";

  @Watch("value")
  valueWatcher(newValue: string) {
    this.isPristine = false;
    this.inputElement.value = newValue;
    this.selectedDate = DateTime.fromFormat(newValue, BalDatepicker.FORMAT);
    this.pointerDate = DateTime.fromFormat(newValue, BalDatepicker.FORMAT);
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
    if (this.value) {
      this.isPristine = false;
      this.selectedDate = DateTime.fromFormat(this.value, BalDatepicker.FORMAT);
      this.pointerDate = DateTime.fromFormat(this.value, BalDatepicker.FORMAT);
    }
  }

  componentDidLoad() {
    this.inputElement.value = this.value;
  }

  /**
   * Open the datepicker dropdown
   */
  @Method()
  open() {
    this.pointerDate = this.selectedDate;
  }

  /**
   * Close the datepicker dropdown
   */
  @Method()
  close() {
    this.dropDownElement.close();
  }

  get parsedMaxDate(): DateTime {
    return DateTime.fromFormat(this.maxDate, BalDatepicker.FORMAT).startOf("day");
  }

  get parsedMinDate(): DateTime {
    return DateTime.fromFormat(this.minDate, BalDatepicker.FORMAT).startOf("day");
  }

  get firstDateOfBox(): DateTime {
    return this.pointerDate.startOf("month").startOf("week");
  }

  get calendarGrid(): CalendarCell[][] {
    let weekDatePointer = this.firstDateOfBox;
    let dayDatePointer = this.firstDateOfBox;
    let calendar = [];

    do {
      let row = [];
      do {
        row = [...row, {
          date: dayDatePointer,
          dateString: dayDatePointer.toISODate(),
          label: dayDatePointer.day.toString(),
          isToday: this.now.equals(dayDatePointer),
          isSelected: !this.isPristine && this.selectedDate.equals(dayDatePointer),
          isDisabled: false,
          isOutdated: !this.pointerDate.hasSame(dayDatePointer, "month")
            || (this.minDate && dayDatePointer < this.parsedMinDate)
            || (this.maxDate && dayDatePointer > this.parsedMaxDate),
        } as CalendarCell];
        dayDatePointer = dayDatePointer.plus({day: 1});
      } while (weekDatePointer.hasSame(dayDatePointer, "week"));
      calendar = [...calendar, row];
      weekDatePointer = weekDatePointer.plus({week: 1});
    } while (this.pointerDate.hasSame(dayDatePointer, "month"));

    return calendar;
  }

  private previousMonth() {
    this.pointerDate = this.pointerDate.minus({month: 1});
  }

  private nextMonth() {
    this.pointerDate = this.pointerDate.plus({month: 1});
  }

  private handleYearSelect(event: any) {
    this.pointerDate = this.pointerDate.set({year: event.target.value});
  }

  private handleMonthSelect(event: any) {
    this.pointerDate = this.pointerDate.set({month: parseInt(event.target.value, 10) + 1});
  }

  private selectDate(cell: CalendarCell) {
    if (!cell.isDisabled && !cell.isOutdated) {
      this.isPristine = false;
      this.selectedDate = cell.date;
      this.pointerDate = cell.date;
      this.inputEventEmitter.emit(this.selectedDate.toISODate());
      this.inputElement.value = this.selectedDate.toFormat(BalDatepicker.FORMAT);
      this.close();
    }
  }

  render() {
    return (
      <Host>
        <div class="datepicker control">
          <bal-dropdown is-expanded ref={el => this.dropDownElement = el as HTMLBalDropdownElement}>
            <div slot="trigger" class="control has-icons-right is-clearfix clickable">
              <input type="text"
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
                          {Info.months("long", {locale: this.language}).map((month, index) =>
                            <option value={index}
                                    selected={this.pointerDate.month === index + 1}>
                              {month}
                            </option>,
                          )}
                            </select>
                            </span></div>
                      <div class="control year-select"><span class="select">
                            <select onInput={(event) => this.handleYearSelect(event)}>
                               {[2019, 2020, 2021, 2022].map((year) =>
                                 <option value={year}
                                         selected={this.pointerDate.hasSame(DateTime.local(year), "year")}>
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
                    {Info.weekdays("short", {locale: this.language}).map((weekday) => <div
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
