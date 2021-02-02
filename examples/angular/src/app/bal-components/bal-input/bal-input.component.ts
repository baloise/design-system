import { Component, OnInit } from '@angular/core';
import { parseCustomEvent } from '@baloise/ui-library-angular/dist';

@Component({
  selector: 'app-bal-input',
  templateUrl: './bal-input.component.html'
})
export class BalInputComponent implements OnInit {
  inputValue: string = ''

  constructor() { }

  ngOnInit(): void {
  }

  onInput(event: CustomEvent<string>): void {
    console.warn('onInput', parseCustomEvent(event))
  }

}
