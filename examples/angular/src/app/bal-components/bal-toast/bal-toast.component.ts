import { Component, OnInit } from '@angular/core';
import { balToastController } from '@baloise/ui-library'

@Component({
  selector: 'app-bal-toast',
  templateUrl: './bal-toast.component.html'
})
export class BalToastComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  createToast() {
    balToastController.create({message: 'Message'});
  }

}
