import { ApplicationConfig, importProvidersFrom } from '@angular/core'

import { BaloiseDesignSystemModule } from '../design-system'

export const appConfig: ApplicationConfig = {
  providers: [importProvidersFrom(BaloiseDesignSystemModule.forRoot())],
}
