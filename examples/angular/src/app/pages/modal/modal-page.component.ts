import { Component, ViewChild } from '@angular/core'
import type { Components } from '@baloise/design-system-components'
import { BalModalService } from '@baloise/design-system-components-angular'

@Component({
  selector: 'app-modal',
  templateUrl: './modal-page.component.html',
})
export class ModalPageComponent {
  // @ViewChild('modal') modal!: Components.BalModal

  constructor(modal: BalModalService) {}

  ngOnInit(): void {}

  openModal() {
    // this.modal.open()
  }

  closeModal() {
    // this.modal.close()
  }
}
