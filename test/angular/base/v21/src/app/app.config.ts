import type { ApplicationConfig } from '@angular/core'
import { balProviders } from '../design-system'

export const appConfig: ApplicationConfig = {
  providers: [...balProviders],
}
