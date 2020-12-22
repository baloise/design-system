import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bal-checkbox',
  templateUrl: './bal-checkbox.component.html'
})
export class BalCheckboxComponent implements OnInit {
  checkbox: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

}
