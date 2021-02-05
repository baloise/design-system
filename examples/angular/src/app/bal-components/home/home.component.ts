import { Component, OnInit } from '@angular/core';
import { balClaimNumber } from '@baloise/ui-library-utils'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  claimNumber: string = '93001217169'

  constructor() { }

  ngOnInit(): void {
  }

  claimNumberFormatted() {
    return balClaimNumber(this.claimNumber);
  }

}
