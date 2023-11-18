import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BalModalService, BaloiseDesignSystemModule } from 'v16/src/generated/src'

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, BaloiseDesignSystemModule],
  template: `
    <bal-modal-header>Modal Title</bal-modal-header>
    <bal-modal-body>
      <p>{{ firstName }}</p>
      <p>{{ lastName }}</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </p>
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

  constructor(private modalService: BalModalService) {}

  closeModal() {
    this.modalService.dismiss({
      firstName: this.firstName,
      lastName: this.lastName,
      dismissed: true,
    })
  }
}
