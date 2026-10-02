import { Component, inject, signal } from '@angular/core'
import { DsButton, DsModalService } from '@helvetia-design/angular'
import { ModalContent } from './modal-content'

@Component({
  selector: 'app-modal-demo',
  imports: [DsButton],
  templateUrl: './modal-demo.html',
})
export class ModalDemo {
  private readonly modalService = inject(DsModalService)
  protected readonly result = signal('none')

  protected async open(options?: { closable?: boolean }) {
    const modalRef = await this.modalService.create(
      ModalContent,
      { title: 'Outer modal', message: 'Hello from DS_MODAL_DATA' },
      {
        label: 'Outer modal',
        ...options,
      },
    )
    const { data, role } = await modalRef.onDidDismiss()
    this.result.set(`${role ?? 'none'}:${JSON.stringify(data) ?? ''}`)
  }
}
