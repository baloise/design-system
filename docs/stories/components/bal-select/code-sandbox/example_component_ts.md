```ts
import { CommonModule } from "@angular/common";
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy
} from "@angular/core";
import { BaloiseDesignSystemModule } from "@baloise/design-system-components-angular";
import { FormControl } from "@angular/forms";
import { ChangeDetectorRef } from "@angular/core";
/** PLACEHOLDER FOR DESIGN SYSTEM IMPORTS */

@Component({
  selector: "app-example",
  templateUrl: "example.component.html",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, BaloiseDesignSystemModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleComponent {
  args = {
    typeahead: true,
    remote: true,
    loading: true,
    selectionOptional: true,
    value: "Ticino",
    placeholder: "Try finding your canton"
  };
  cantons: string[] = [
    "Zürich",
    "Bern/Berne",
    "Luzern",
    "Uri",
    "Schwyz",
    "Unterwalden",
    "Glarus",
    "Zug",
    "Freiburg/Fribourg",
    "Solothurn",
    "Basel-Stadt",
    "Basel-Land",
    "Schaffhausen",
    "Appenzell",
    "SanktGallen",
    "Graubünden",
    "Aargau",
    "Thurgau",
    "Ticino",
    "Vaud",
    "Wallis",
    "Neuchâtel",
    "Genève",
    "Jura"
  ];

  searchControl = new FormControl();
  public options: string[] = [];
  loading = false;

  private mockedApiCallTimeoutId: number;

  constructor(private cdr: ChangeDetectorRef) {}

  mockedApiCall(search: string, timeout = 1000): Promise<string[]> {
    return new Promise((resolve) => {
      if (this.mockedApiCallTimeoutId) {
        clearTimeout(this.mockedApiCallTimeoutId);
      }
      this.mockedApiCallTimeoutId = setTimeout(() => {
        const response = this.cantons.filter((e) => {
          return (e || "")
            .toLowerCase()
            .startsWith((search || "").toLowerCase());
        });
        resolve(response);
      }, timeout);
    });
  }

  debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  onInputDebouced(ev: any) {
    this.debounce(this.onInput(ev), 300);
  }

  async onChange(ev: any) {
    const search = ev.detail;
    this.options = await this.mockedApiCall(search, 0);
    this.loading = false;
  }

  async onInput(ev: any) {
    const search = ev.detail;
    this.loading = true;
    this.options = await this.mockedApiCall(search);
    this.loading = false;
    this.cdr.markForCheck();
  }
}
```
