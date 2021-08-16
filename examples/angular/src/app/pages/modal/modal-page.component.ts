import { Component, ViewChild } from '@angular/core'
import type { Components } from '@baloise/design-system-components'

@Component({
  selector: 'app-modal',
  templateUrl: './modal-page.component.html',
})
export class ModalPageComponent {
  @ViewChild('modal') modal!: Components.BalModal

  constructor() {}

  ngOnInit(): void {}

  openModal() {
    this.modal.open()
  }

  closeModal() {
    this.modal.close()
  }
}
