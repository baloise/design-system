import { Component } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { parseCustomEvent } from '@baloise/ui-library-angular'

@Component({
  selector: 'app-bal-input',
  templateUrl: './bal-input.component.html',
})
export class BalInputComponent {
  inputValue: string = ''

  firstName: FormControl = new FormControl(null, [Validators.required])

  onInput(event: CustomEvent<string>): void {
    console.warn('onInput', parseCustomEvent(event))
  }
}
