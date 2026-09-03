import { Component, signal } from '@angular/core'
import { DsCheckbox } from '@baloise/ds-angular'

@Component({
  selector: 'app-checkbox-demo',
  imports: [DsCheckbox],
  templateUrl: './checkbox-demo.html',
})
export class CheckboxDemo {
  protected readonly checked = signal(false)

  protected onChange(event: CustomEvent<boolean>) {
    this.checked.set(event.detail)
  }
}
