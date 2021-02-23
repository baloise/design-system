import { Component, ViewChild } from '@angular/core';
import type { Components } from '@baloise/ui-library';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  @ViewChild('modal') modal!: Components.BalModal;

  constructor() {}

  ngOnInit(): void {}

  openModal() {
    this.modal.open();
  }

  closeModal() {
    this.modal.close();
  }
}
