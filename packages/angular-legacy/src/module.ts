import { NgModule, APP_INITIALIZER, ModuleWithProviders, NgZone } from '@angular/core'
import { CommonModule, DOCUMENT } from '@angular/common'

import type { BaloiseDesignSystemAngularConfig } from '@baloise/ds-angular-common'
import {
  AngularDelegate,
  BalBreakpointsService,
  BalConfigService,
  BalModalService,
  BalOrientationService,
  BalSnackbarService,
  BalToastService,
  BalTokenBreakpointSubject,
  BalTokenBreakpoints,
  BalTokenConfig,
  BalTokenModal,
  BalTokenSnackbar,
  BalTokenToast,
  BalTokenUserConfig,
  BalTokenDevice,
  BalTokenOrientationSubject,
} from '@baloise/ds-angular-common'

import {
  balBreakpointSubject,
  balBreakpoints,
  balModalController,
  balSnackbarController,
  balToastController,
  attachToConfig,
  defaultConfig,
  detachFromConfig,
  updateBalAllowedLanguages,
  updateBalAnimated,
  updateBalIcons,
  updateBalLanguage,
  updateBalRegion,
  balDevice,
  balOrientationSubject,
} from '@baloise/ds-core'

import { appInitialize } from './app-initialize'
import { DIRECTIVES } from './generated/proxies-list'
import { BooleanValueAccessor } from './generated/boolean-value-accessor'
import { NumericValueAccessor } from './generated/number-value-accessor'
import { SelectValueAccessor } from './generated/select-value-accessor'
import { TextValueAccessor } from './generated/text-value-accessor'

import { BalNgErrorComponent } from './directives/error.component'
import { BalAutoFocus } from './directives/focus.directive'

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
          provide: BalTokenUserConfig,
          useValue: config,
        },
        {
          provide: BalTokenConfig,
          useValue: {
            attachToConfig,
            defaultConfig,
            detachFromConfig,
            updateBalAllowedLanguages,
            updateBalAnimated,
            updateBalIcons,
            updateBalLanguage,
            updateBalRegion,
          },
        },
        {
          provide: BalTokenToast,
          useValue: balToastController,
        },
        {
          provide: BalTokenSnackbar,
          useValue: balSnackbarController,
        },
        {
          provide: BalTokenModal,
          useValue: balModalController,
        },
        {
          provide: BalTokenBreakpoints,
          useValue: balBreakpoints,
        },
        {
          provide: BalTokenBreakpointSubject,
          useValue: balBreakpointSubject,
        },
        {
          provide: BalTokenDevice,
          useValue: balDevice,
        },
        {
          provide: BalTokenOrientationSubject,
          useValue: balOrientationSubject,
        },
        {
          provide: APP_INITIALIZER,
          useFactory: appInitialize,
          multi: true,
          deps: [BalTokenUserConfig, DOCUMENT, NgZone],
        },
      ],
    }
  }
}
