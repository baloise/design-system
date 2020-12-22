import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bal-select',
  templateUrl: './bal-select.component.html'
})
export class BalSelectComponent implements OnInit {
  selected: string[] = ["1998"]

  constructor() { }

  ngOnInit(): void {
  }

}
