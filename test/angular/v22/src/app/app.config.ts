import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core'
import { provideDesignSystem } from '@baloise/ds-angular'

export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), provideDesignSystem()],
}
