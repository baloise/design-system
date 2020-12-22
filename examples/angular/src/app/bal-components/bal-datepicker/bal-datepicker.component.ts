import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bal-datepicker',
  templateUrl: './bal-datepicker.component.html'
})
export class BalDatepickerComponent implements OnInit {
  value: Date = new Date()

  constructor() { }

  ngOnInit(): void {
  }

}
