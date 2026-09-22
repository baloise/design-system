import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { BalModalService, balImports } from '../design-system'

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...balImports],
  template: `
    <bal-modal-header>Modal Title</bal-modal-header>
    <bal-modal-body>
      <p>{{ firstName }}</p>
      <p>{{ lastName }}</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </p>
      <bal-field>
        <bal-field-label>Amount from a property binding</bal-field-label>
        <bal-field-control>
          <bal-number-input
            data-testid="modal-amount-property"
            [value]="amount"
            decimal="2"
            suffix="CHF"
          ></bal-number-input>
        </bal-field-control>
      </bal-field>
      <bal-field [formGroup]="form">
        <bal-field-label>Amount from a form control</bal-field-label>
        <bal-field-control>
          <bal-number-input
            data-testid="modal-amount-control"
            formControlName="amount"
            decimal="2"
            suffix="CHF"
          ></bal-number-input>
        </bal-field-control>
      </bal-field>
      <bal-button-group position="right" class="mt-medium">
        <bal-button color="link" (click)="closeModal()">Cancel</bal-button>
        <bal-button color="primary" (click)="closeModal()">Okay</bal-button>
      </bal-button-group>
    </bal-modal-body>
  `,
})
export class ModalComponent {
  @Input() firstName!: string
  @Input() lastName!: string
  @Input() amount = 42.15

  form = new FormGroup({
    amount: new FormControl<number>(815.5),
  })

  constructor(private modalService: BalModalService) {}

  closeModal() {
    this.modalService.dismiss({
      firstName: this.firstName,
      lastName: this.lastName,
      dismissed: true,
    })
  }
}
