import type { ApplicationConfig } from '@angular/platform-browser'
import { balProviders } from '../design-system'

export const appConfig: ApplicationConfig = {
  providers: [...balProviders],
}
