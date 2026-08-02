import { Component, signal } from '@angular/core'
import { DsButton, DsCheckbox, DsInput } from '@baloise/ds-angular'

@Component({
  selector: 'app-root',
  imports: [DsButton, DsInput, DsCheckbox],
  templateUrl: './app.html',
})
export class App {
  protected readonly clicks = signal(0)
  protected readonly inputValue = signal('')
  protected readonly checked = signal(false)

  protected onClick() {
    this.clicks.update(count => count + 1)
  }

  protected onInput(event: CustomEvent<string | null>) {
    this.inputValue.set(event.detail ?? '')
  }

  protected onChange(event: CustomEvent<boolean>) {
    this.checked.set(event.detail)
  }
}
