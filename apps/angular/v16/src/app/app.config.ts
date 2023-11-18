import { ApplicationConfig, importProvidersFrom } from '@angular/core'

import { BaloiseDesignSystemModule } from 'v16/src/generated/src'

export const appConfig: ApplicationConfig = {
  providers: [importProvidersFrom(BaloiseDesignSystemModule.forRoot())],
}
