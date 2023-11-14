import {
  Directive,
  Host,
  HostBinding,
  Inject,
  Injector,
  Input,
  OnChanges,
  OnInit,
  Optional,
  SkipSelf,
} from '@angular/core'
import { AbstractControl, ControlContainer } from '@angular/forms'
import { BaloiseDesignSystemAngularConfig } from '../config'
import { BalConfigToken } from '../token'

@Directive({
  selector: 'bal-ng-error',
})
export class BalNgErrorComponent implements OnChanges, OnInit {
  control?: AbstractControl | null
  config!: BaloiseDesignSystemAngularConfig

  @Input() error?: string

  @HostBinding('attr.controlname')
  @Input()
  controlName?: string

  // constructor(protected controlContainer: ControlContainer, protected injector: Injector) {}

  constructor(
    @Optional()
    @Host()
    @SkipSelf()
    protected controlContainer: ControlContainer,
    @Inject(Injector) protected injector: Injector,
  ) {}

  ngOnInit(): void {
    this.config = this.injector.get(BalConfigToken) as BaloiseDesignSystemAngularConfig
  }

  get hasError(): boolean {
    if (
      this.control === undefined ||
      this.control === null ||
      this.controlName === undefined ||
      this.controlName === null
    ) {
      return false
    } else {
      const invalidateOn = this.config?.forms?.invalidateOn || 'touched'
      if (!this.control[invalidateOn]) {
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
