import { NgModule, APP_INITIALIZER, ModuleWithProviders, NgZone } from '@angular/core'
import { CommonModule, DOCUMENT } from '@angular/common'
import {
  AngularDelegate,
  BalBreakpointsService,
  BalConfigService,
  BalModalService,
  BalOrientationService,
  BalSnackbarService,
  BalToastService,
  BalConfigToken,
} from '@baloise/design-system-components-angular/common'
import { appInitialize } from './app-initialize'
import { DIRECTIVES } from './generated/proxies-list'
import { BooleanValueAccessor } from './generated/boolean-value-accessor'
import { NumericValueAccessor } from './generated/number-value-accessor'
import { SelectValueAccessor } from './generated/select-value-accessor'
import { TextValueAccessor } from './generated/text-value-accessor'

import { BalNgErrorComponent } from './directives/error.component'
import { BalAutoFocus } from './directives/focus.directive'

import type { BaloiseDesignSystemAngularConfig } from '@baloise/design-system-components-angular/common'

const DECLARATIONS = [
  // generated proxies
  ...DIRECTIVES,
  // ngModel accessors
  BooleanValueAccessor,
  NumericValueAccessor,
  SelectValueAccessor,
  TextValueAccessor,
  // custom directives
  BalAutoFocus,
  BalNgErrorComponent,
]

@NgModule({
  declarations: DECLARATIONS,
  exports: DECLARATIONS,
  imports: [CommonModule],
  providers: [
    AngularDelegate,
    BalModalService,
    BalToastService,
    BalSnackbarService,
    BalBreakpointsService,
    BalOrientationService,
    BalConfigService,
  ],
})
export class BaloiseDesignSystemModule {
  static forRoot(config: BaloiseDesignSystemAngularConfig = {}): ModuleWithProviders<BaloiseDesignSystemModule> {
    return {
      ngModule: BaloiseDesignSystemModule,
      providers: [
        {
          provide: BalConfigToken,
          useValue: config,
        },
        {
          provide: APP_INITIALIZER,
          useFactory: appInitialize,
          multi: true,
          deps: [BalConfigToken, DOCUMENT, NgZone],
        },
      ],
    }
  }
}
