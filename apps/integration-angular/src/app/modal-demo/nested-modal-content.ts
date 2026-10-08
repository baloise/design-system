import { Component, inject } from '@angular/core'
import { DS_MODAL_DATA, DsButton, DsModalRef } from '@helvetia-design/angular'

interface NestedModalContentData {
  title: string
  message: string
}

@Component({
  selector: 'app-nested-modal-content',
  imports: [DsButton],
  templateUrl: './nested-modal-content.html',
})
export class NestedModalContent {
  protected readonly data = inject(DS_MODAL_DATA) as NestedModalContentData

  private readonly modalRef = inject(DsModalRef)

  protected close() {
    this.modalRef.dismiss({ nested: true }, 'confirm')
  }
}
