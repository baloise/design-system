import { Component, ViewChild } from '@angular/core'
import type { Components } from '@baloise/design-system-components'
import { BalModalService } from '@baloise/design-system-components-angular'
import { ModalComponent } from './modal.component'

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.component.html',
})
export class ModalPageComponent {
  // @ViewChild('modal') modal!: Components.BalModal

  constructor(private modalService: BalModalService) {}

  ngOnInit(): void {}

  async openModal() {
    const modal = await this.modalService.create({
      component: ModalComponent,
    })
    return await modal.present()

    const { data } = await modal.onWillDismiss()
    console.log(data)
    // this.modal.open()
  }

  closeModal() {
    // this.modal.close()
  }
}
