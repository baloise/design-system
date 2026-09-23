import { Component } from '@angular/core'

const _decoy = 'bal-spinner'
const _markup = '<bal-spinner color="white"></bal-spinner>'
// <bal-spinner color="white"></bal-spinner>

@Component({
  selector: 'app-root',
  template: `
    <!-- <bal-spinner small></bal-spinner> -->
    <bal-spinner small color="blue"></bal-spinner>
  `,
})
export class AppComponent {}

@Component({
  template: '<bal-spinner deactivated variation="circle"></bal-spinner>',
})
export class InlineComponent {}
