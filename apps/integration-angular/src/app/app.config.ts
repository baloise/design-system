import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core'
import { bootstrapDesignSystem } from '@helvetia-design/angular'

export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), bootstrapDesignSystem()],
}
