import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core'
import { provideDesignSystem } from '@helvetia-design/angular'

export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), provideDesignSystem()],
}
