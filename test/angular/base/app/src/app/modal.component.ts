import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { BalModalService, balImports } from '../design-system'

@Component({
  selector: 'app-modal',
  imports: [CommonModule, ...balImports],
  template: `
    <bal-modal-header>Modal Title</bal-modal-header>
    <bal-modal-body>
      <p>{{ firstName }}</p>
      <p>{{ lastName }}</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </p>
      <div class="buttons is-right mt-medium">
        <button class="button is-link" (click)="closeModal()">Cancel</button>
        <button class="button is-primary" (click)="closeModal()">Okay</button>
      </div>
    </bal-modal-body>
  `,
})
export class ModalComponent {
  @Input() firstName!: string
  @Input() lastName!: string

  constructor(private modalService: BalModalService) {}

  closeModal() {
    this.modalService.dismiss({
      firstName: this.firstName,
      lastName: this.lastName,
      dismissed: true,
    })
  }
}
