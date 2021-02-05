import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bal-input',
  templateUrl: './bal-input.component.html'
})
export class BalInputComponent implements OnInit {
  inputValue: string = 'Value'

  constructor() { }

  ngOnInit(): void {
  }

}
