import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterOutlet } from '@angular/router'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { BaloiseDesignSystemModule } from 'src/generated/src'
import { InputComponent } from './form-components/input.component'

export interface UpdateControl {
  name: string
  value: any
}

@Component({
  selector: 'app-root',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, BaloiseDesignSystemModule, InputComponent],
  template: `
    <bal-app class="has-sticky-footer">
      <main class="container py-normal">
        <form class="is-flex fg-normal is-flex-direction-column" [formGroup]="myForm" (ngSubmit)="onSubmit()">
          <app-input [form]="myForm" (updateControl)="updateValue($event)"></app-input>

          <div>
            <p class="pt-medium">Complete the form to enable button.</p>
            <bal-button elementType="submit" [disabled]="!myForm.valid">Submit</bal-button>
          </div>

          {{ myForm.value | json }}

          <router-outlet></router-outlet>
        </form>
      </main>
    </bal-app>
  `,
})
export class AppComponent {
  myForm = new FormGroup({
    textInput: new FormControl('', [Validators.required]),
  })

  updateValue(option: UpdateControl) {
    const control = this.myForm.get(option.name)
    if (control) {
      control.setValue(option.value)
    }
  }

  onSubmit() {
    console.warn(this.myForm.value)
  }
}
