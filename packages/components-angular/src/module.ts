import { APP_INITIALIZER, InjectionToken, ModuleWithProviders, NgModule, NgZone } from '@angular/core'
import { CommonModule, DOCUMENT } from '@angular/common'

import { appInitialize, BaloiseDesignSystemAngularConfig } from './app-initialize'
import { AngularDelegate, BalAppModule, BalNoticesModule } from '.'

const MODULES = [BalAppModule, BalNoticesModule]

export const ConfigToken = new InjectionToken<any>('USERCONFIG')

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
          provide: ConfigToken,
          useValue: config,
        },
        {
          provide: APP_INITIALIZER,
          useFactory: appInitialize,
          multi: true,
          deps: [ConfigToken, DOCUMENT, NgZone],
        },
      ],
    }
  }
}
