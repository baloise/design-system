import { Component, inject } from '@angular/core'
import { DS_MODAL_DATA, DsButton, DsModalRef, DsModalService } from '@helvetia-design/angular'
import { NestedModalContent } from './nested-modal-content'

interface ModalContentData {
  title: string
  message: string
}

@Component({
  selector: 'app-modal-content',
  imports: [DsButton],
  templateUrl: './modal-content.html',
})
export class ModalContent {
  protected readonly data = inject(DS_MODAL_DATA) as ModalContentData

  private readonly modalRef = inject(DsModalRef)
  private readonly modalService = inject(DsModalService)

  protected async openNested() {
    await this.modalService.create(
      NestedModalContent,
      {
        title: 'Nested modal',
        message: 'Nested modal content',
      },
      { label: 'Nested modal' },
    )
  }

  protected close() {
    this.modalRef.dismiss({ message: this.data.message, confirmed: true }, 'confirm')
  }
}
