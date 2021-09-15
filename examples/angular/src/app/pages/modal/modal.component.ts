import { Component, Input } from '@angular/core'
import { BalModalService } from '@baloise/design-system-components-angular'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  // Data passed in by componentProps
  @Input() firstName!: string
  @Input() lastName!: string

  constructor(private modalService: BalModalService) {}

  closeModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalService.dismiss({
      dismissed: true,
    })
  }
}
