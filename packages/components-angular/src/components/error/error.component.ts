import { Component, Host, HostBinding, Input, OnChanges, Optional, SkipSelf } from '@angular/core'
import { AbstractControl, ControlContainer } from '@angular/forms'

@Component({
  selector: 'bal-ng-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class BalNgErrorComponent implements OnChanges {
  @Input()
  control: AbstractControl | null

  @HostBinding('attr.controlname')
  @Input()
  controlName: string

  constructor(
    @Optional()
    @Host()
    @SkipSelf()
    private controlContainer: ControlContainer,
  ) {}

  get displayError(): boolean {
    return this.control === null || (this.control.invalid && this.control.touched)
  }

  ngOnChanges() {
    if (this.controlContainer) {
      if (this.controlName !== null && this.controlContainer.control !== null) {
        this.control = this.controlContainer.control.get(this.controlName)
      }
    }
  }
}
