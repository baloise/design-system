/* eslint-disable @angular-eslint/directive-class-suffix */
import { AfterViewInit, ChangeDetectorRef, Directive, HostBinding, Inject, Injector, Input } from '@angular/core'
import { AbstractControl, ControlContainer, FormGroup } from '@angular/forms'
import { BehaviorSubject } from 'rxjs'

import type { BaloiseDesignSystemAngularConfig } from '../utils/config'
import { raf } from '../utils/utils'
import { BalTokenConfig } from '../utils/token'

// @Component({
//   selector: 'bal-ng-error',
//   template: `<ng-content *ngIf="(ready | async) && hasError"></ng-content>`,
//   styles: [
//     `
//       :host {
//         display: inline-block;
//       }
//     `,
//   ],
// })

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'bal-ng-error',
})
export class BalNgErrorComponent implements AfterViewInit {
  /**
   * The name of form validator to show.
   */
  @Input() error?: string

  /**
   * FormGroup where the control of the error message is located. (optional)
   */
  @Input() group?: FormGroup

  /**
   * The name of the form control, which is registered in the form group.
   */
  @HostBinding('attr.controlname')
  @Input()
  controlName?: string

  constructor(
    @Inject(Injector) protected injector: Injector,
    @Inject(ChangeDetectorRef) protected cd: ChangeDetectorRef,
  ) { }

  private controlContainer?: ControlContainer
  private control?: AbstractControl | null
  private config?: BaloiseDesignSystemAngularConfig
  private invalidateOn: 'dirty' | 'touched' = 'touched'
  ready = new BehaviorSubject(false)

  ngAfterViewInit(): void {
    raf(() => {
      try {
        this.config = this.injector.get<BaloiseDesignSystemAngularConfig>(BalTokenConfig)
      } catch {
        /* No config provided */
      }

      this.invalidateOn = this.config?.forms?.invalidateOn || this.invalidateOn
      this.control = this.getControl()

      if (!this.control) {
        console.warn('[BalNgErrorComponent] Could not find the given controlName in the form control container')
      } else {
        this.ready.next(true)
        this.cd.detectChanges()
      }
    })
  }

  get hasError(): boolean {
    if (this.controlName && this.config && this.control) {
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private getControl(): AbstractControl<any, any> | null {
    debugger
    if (this.controlName) {
      if (this.group) {
        return this.group.get(this.controlName)
      } else {
        try {
          this.controlContainer = this.injector.get<ControlContainer>(ControlContainer)
        } catch {
          /* No ControlContainer provided */
        }

        if (!this.controlContainer) {
          return null
        }

        return this.controlContainer.control?.get(this.controlName) as AbstractControl<any, any>
      }
    } else {
      console.warn('[BalNgErrorComponent] Please provide a controlName')
    }
    return null
  }
}
