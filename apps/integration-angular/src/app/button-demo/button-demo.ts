import { Component, signal } from '@angular/core'
import { DsButton } from '@baloise/ds-angular'

@Component({
  selector: 'app-button-demo',
  imports: [DsButton],
  templateUrl: './button-demo.html',
})
export class ButtonDemo {
  protected readonly clicks = signal(0)

  protected onClick() {
    this.clicks.update(count => count + 1)
  }
}
