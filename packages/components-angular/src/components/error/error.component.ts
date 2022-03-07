import { Component, Host, HostBinding, Input, OnChanges, Optional, SkipSelf } from '@angular/core'
import { AbstractControl, ControlContainer } from '@angular/forms'

@Component({
  selector: 'bal-ng-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class BalNgErrorComponent implements OnChanges {
  control?: AbstractControl | null

  @Input() error?: string

  @HostBinding('attr.controlname')
  @Input()
  controlName?: string

  constructor(
    @Optional()
    @Host()
    @SkipSelf()
    private controlContainer: ControlContainer,
  ) {}

  get hasError(): boolean {
    if (
      this.control === undefined ||
      this.control === null ||
      this.controlName === undefined ||
      this.controlName === null
    ) {
      return false
    } else {
      if (!this.control.touched) {
        return false
      }

      if (this.error === undefined || this.error === null) {
        return this.control.invalid
      } else {
        const errors = this.controlContainer.control?.get(this.controlName)?.errors
        if (errors) {
          const keys = Object.keys(errors).filter(k => k !== 'errorType')
          if (keys.length > 0) {
            const isFirstKeyOurError = keys[0] === this.error
            return isFirstKeyOurError
          }
        }
      }
    }

    return false
  }

  ngOnChanges() {
    if (this.controlContainer) {
      if (this.controlName !== null && this.controlName !== undefined) {
        this.control = this.controlContainer.control?.get(this.controlName)
        if (this.control === undefined || this.control === null) {
          console.warn('[BalNgErrorComponent] Could not find the given controlName in the form control container')
        }
      } else {
        console.warn('[BalNgErrorComponent] Please provide a controlName')
      }
    }
  }
}
