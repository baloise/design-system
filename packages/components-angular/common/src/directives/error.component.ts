import { AfterViewInit, Directive, HostBinding, Inject, Injector, Input } from '@angular/core'
import { AbstractControl, ControlContainer } from '@angular/forms'

import { BaloiseDesignSystemAngularConfig } from '../config'
import { raf } from '../utils'
import { BalTokenConfig } from '../token'

// @Component({
//   selector: 'bal-ng-error',
//   template: `<ng-content *ngIf="hasError"></ng-content>`,
//   styles: [
//     `
//       :host {
//         display: inline-block;
//       }
//     `,
//   ],
// })

@Directive({
  selector: 'bal-ng-error',
})
export class BalNgErrorComponent implements AfterViewInit {
  /**
   * The name of form validator to show.
   */
  @Input() error?: string

  /**
   * The name of the form control, which is registered in the form group.
   */
  @HostBinding('attr.controlname')
  @Input()
  controlName?: string

  constructor(@Inject(Injector) protected injector: Injector) {}

  private controlContainer?: ControlContainer
  private control?: AbstractControl | null
  private config?: BaloiseDesignSystemAngularConfig
  private invalidateOn: 'dirty' | 'touched' = 'touched'

  ngAfterViewInit(): void {
    raf(() => {
      try {
        this.controlContainer = this.injector.get<ControlContainer>(ControlContainer)
      } catch {
        /* No ControlContainer provided */
      }

      if (!this.controlContainer) {
        return
      }

      try {
        this.config = this.injector.get<BaloiseDesignSystemAngularConfig>(BalTokenConfig)
      } catch {
        /* No config provided */
      }

      this.invalidateOn = this.config?.forms?.invalidateOn || this.invalidateOn

      if (this.controlName) {
        this.control = this.controlContainer.control?.get(this.controlName)
        if (!this.control) {
          console.warn('[BalNgErrorComponent] Could not find the given controlName in the form control container')
        }
      } else {
        console.warn('[BalNgErrorComponent] Please provide a controlName')
      }
    })
  }

  get hasError(): boolean {
    if (this.controlName && this.controlContainer && this.config && this.control) {
      if (!this.control[this.invalidateOn]) {
        return false
      }

      if (!this.error) {
        return this.control.invalid
      }

      if (this.control.errors) {
        const validationErrorKeys = Object.keys(this.control.errors).filter(k => k !== 'errorType')
        const hasValidationErrors = validationErrorKeys.length > 0

        if (hasValidationErrors) {
          return validationErrorKeys[0] === this.error // isFirstKeyOurError
        }
      }
    }

    return false
  }
}
