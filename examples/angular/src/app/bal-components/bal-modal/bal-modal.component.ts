import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-bal-modal',
  templateUrl: './bal-modal.component.html'
})
export class BalModalComponent implements OnInit {
  @ViewChild('modal') modal; 

  constructor() { }

  ngOnInit(): void {
  }

  openModal() {
    const modal = this.modal.el as HTMLBalModalElement;
    modal.open();
  }

  closeModal() {
    const modal = this.modal.el as HTMLBalModalElement;
    modal.close();
  }

}
