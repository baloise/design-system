import {Component, Host, h, Element} from "@stencil/core";
import "moment";
import Pikaday from "pikaday";

@Component({
  tag: "bal-datepicker",
  styleUrl: "bal-datepicker.scss",
  // shadow: true,
})
export class BalDatepicker {
  @Element() element!: HTMLElement;

  inputElement!: HTMLElement;
  picker!: Pikaday;

  componentDidLoad() {
    this.picker = new Pikaday({
      field: this.inputElement,
      firstDay: 1,
      showDaysInNextAndPreviousMonths: true,
      format: "DD.MM.YYYY",
      onClose: () => this.picker.show(),
      i18n: {
        previousMonth: "Previous Month",
        nextMonth: "Next Month",
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        weekdaysShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      },
    });
    this.picker.show();
  }

  componentDidUnload() {
    if (this.picker) {
      if (this.picker.isVisible()) {
        this.picker.hide();
      }
      this.picker.destroy();
    }
  }

  render() {
    return (
      <Host>
        <input class="input"
               type="text"

               ref={el => this.inputElement = el as HTMLInputElement}/>
      </Host>
    );
  }

}
