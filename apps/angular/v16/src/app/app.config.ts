import { ApplicationConfig, importProvidersFrom } from '@angular/core'

import { BaloiseDesignSystemModule } from '@baloise/design-system-components-angular'

export const appConfig: ApplicationConfig = {
  providers: [importProvidersFrom(BaloiseDesignSystemModule.forRoot())],
}
