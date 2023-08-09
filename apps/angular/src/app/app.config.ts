import { ApplicationConfig, importProvidersFrom } from '@angular/core'
import { provideRouter } from '@angular/router'

import { routes } from './app.routes'

import { BaloiseDesignSystemModule } from '../generated/src'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      BaloiseDesignSystemModule.forRoot({
        defaults: {
          logger: {
            components: ['bal-input'],
            lifecycle: true,
            custom: false,
            render: true,
            event: true,
          },
        },
      }),
    ),
  ],
}
