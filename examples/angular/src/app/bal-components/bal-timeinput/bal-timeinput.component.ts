import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bal-timeinput',
  templateUrl: './bal-timeinput.component.html'
})
export class BalTimeinputComponent implements OnInit {
  value: string = '08:00'
  
  constructor() { }

  ngOnInit(): void {
  }

}
