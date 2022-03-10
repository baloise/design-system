import { APP_INITIALIZER, ModuleWithProviders, NgModule, NgZone } from '@angular/core'
import { CommonModule, DOCUMENT } from '@angular/common'

import { appInitialize, BaloiseDesignSystemAngularConfig } from './app-initialize'
import { AngularDelegate, BalAppModule, BalNoticesModule } from '.'

const MODULES = [BalAppModule, BalNoticesModule]

@NgModule({
  declarations: [],
  exports: [MODULES],
  imports: [CommonModule, MODULES],
  providers: [AngularDelegate],
})
export class BalCoreModule {
  static forRoot(config: BaloiseDesignSystemAngularConfig = {}): ModuleWithProviders<BalCoreModule> {
    return {
      ngModule: BalCoreModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: appInitialize(config),
          multi: true,
          deps: [DOCUMENT, NgZone],
        },
      ],
    }
  }
}
