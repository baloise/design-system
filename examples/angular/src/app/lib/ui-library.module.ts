import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { defineCustomElements, applyPolyfills } from '@baloise/ui-library/loader'

import { DIRECTIVES } from './directives/proxies-list'
import { FILTERS } from './filters'

applyPolyfills().then(() => {
  defineCustomElements(window)
})

const DECLARATIONS = [
  // proxies
  ...DIRECTIVES,

  // filters
  ...FILTERS,
]

@NgModule({
  declarations: [DECLARATIONS],
  exports: [DECLARATIONS],
  imports: [CommonModule, FormsModule],
  providers: [],
})
export class BalUiLibraryModule {}
