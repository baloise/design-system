```ts
import { CommonModule } from '@angular/common'
import { Component, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy } from '@angular/core'
import { BalModalService } from '@baloise/ds-angular'
import { ModalComponent } from './modal.component'

@Component({
  selector: 'app-example',
  templateUrl: 'example.component.html',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleComponent {
  modal!: HTMLBalModalElement

  constructor(private modalService: BalModalService) {}

  async openModal() {
    this.modal = await this.modalService.create({
      component: ModalComponent,
      componentProps: {
        firstName: 'Peter',
        lastName: 'Parker',
      },
    })
    await this.modal.present()

    // Collect the data from the modal through the dismiss event
    const { data } = await this.modal.onWillDismiss()

    // React onDidDismiss
    await this.modal.onDidDismiss()
  }

  closeModal() {
    this.modal.dismiss()
  }
}
```
