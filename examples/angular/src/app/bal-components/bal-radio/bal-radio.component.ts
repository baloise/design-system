import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bal-radio',
  templateUrl: './bal-radio.component.html'
})
export class BalRadioComponent implements OnInit {
  selected: number = 0

  constructor() { }

  ngOnInit(): void {
  }

}
