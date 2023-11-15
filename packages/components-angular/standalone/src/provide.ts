import { DOCUMENT } from '@angular/common'
import { APP_INITIALIZER, NgZone, makeEnvironmentProviders } from '@angular/core'
import type { EnvironmentProviders } from '@angular/core'

import {
  AngularDelegate,
  BalConfigToken,
  BalBreakpointsService,
  BalConfigService,
  BalModalService,
  BalOrientationService,
  BalSnackbarService,
  BalToastService,
} from '@baloise/design-system-components-angular/common'
import type { BaloiseDesignSystemAngularConfig } from '@baloise/design-system-components-angular/common'

import { appInitialize } from './app-initialize'

export const provideBaloiseDesignSystem = (config: BaloiseDesignSystemAngularConfig = {}): EnvironmentProviders => {
  return makeEnvironmentProviders([
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
    AngularDelegate,
    BalBreakpointsService,
    BalConfigService,
    BalModalService,
    BalOrientationService,
    BalSnackbarService,
    BalToastService,
  ])
}
