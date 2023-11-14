import { NgModule, APP_INITIALIZER, ModuleWithProviders } from '@angular/core'
import { CommonModule, DOCUMENT } from '@angular/common'

import { AngularDelegate, BalConfigToken } from '@baloise/design-system-components-angular/common'
import type { BaloiseDesignSystemAngularConfig } from '@baloise/design-system-components-angular/common'

import { appInitialize } from './app-initialize'
import { BaloiseDesignSystemFormModule } from './form.module'

@NgModule({
  providers: [AngularDelegate],
  imports: [CommonModule, BaloiseDesignSystemFormModule],
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
          deps: [BalConfigToken, DOCUMENT],
        },
      ],
    }
  }
}
