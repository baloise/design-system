import { CommonModule } from '@angular/common'
import { ChangeDetectorRef, Component, Inject, Injector } from '@angular/core'

import { BalNgErrorComponent as BalNgErrorComponentBase } from '@baloise/design-system-components-angular/common'

@Component({
  selector: 'bal-ng-error',
  template: `<ng-content *ngIf="(ready | async) && hasError"></ng-content>`,
  standalone: true,
  imports: [CommonModule],
  styles: [
    `
      :host {
        display: inline-block;
      }
    `,
  ],
})
export class BalNgErrorComponent extends BalNgErrorComponentBase {
  constructor(@Inject(Injector) injector: Injector, @Inject(ChangeDetectorRef) cd: ChangeDetectorRef) {
    super(injector, cd)
  }
}
