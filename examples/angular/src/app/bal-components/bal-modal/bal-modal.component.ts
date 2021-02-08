import { Component, OnInit, ViewChild } from '@angular/core'
import type { Components } from '@baloise/ui-library'

@Component({
  selector: 'app-bal-modal',
  templateUrl: './bal-modal.component.html',
})
export class BalModalComponent implements OnInit {
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
