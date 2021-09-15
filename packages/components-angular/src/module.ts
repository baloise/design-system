import { APP_INITIALIZER, ModuleWithProviders, NgModule, NgZone } from '@angular/core'
import { CommonModule, DOCUMENT } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { appInitialize } from './app-initialize'
import { DIRECTIVES } from './directives/proxies-list'
import { BooleanValueAccessor } from './directives/boolean-value-accessor'
import { TextValueAccessor } from './directives/text-value-accessor'
import { SelectValueAccessor } from './directives/select-value-accessor'
import { FILTERS } from './filters'

import { BalToastService } from './bal-toast.service'
import { BalSnackbarService } from './bal-snackbar.service'
import { AutoFocus } from './focus.directive'
import { BalNgErrorComponent } from './components/error/error.component'
import { BalModalService } from './overlays/modal.service'

const DECLARATIONS = [
  // proxies
  ...DIRECTIVES,

  // filters
  ...FILTERS,

  // components
  BalNgErrorComponent,

  // directives
  AutoFocus,

  // ngModel accessors
  BooleanValueAccessor,
  TextValueAccessor,
  SelectValueAccessor,
]

@NgModule({
  declarations: [DECLARATIONS],
  exports: [DECLARATIONS],
  imports: [CommonModule, FormsModule],
  providers: [BalToastService, BalSnackbarService, BalModalService],
})
export class BaloiseDesignSystemModule {
  static forRoot(): ModuleWithProviders<BaloiseDesignSystemModule> {
    return {
      ngModule: BaloiseDesignSystemModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: appInitialize,
          multi: true,
          deps: [DOCUMENT, NgZone],
        },
      ],
    }
  }
}
