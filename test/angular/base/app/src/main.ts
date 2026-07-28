import { bootstrapApplication } from '@angular/platform-browser'
import { bootstrapDesignSystem } from '@baloise/ds-angular'

import { App } from './app/app'
import { appConfig } from './app/app.config'

bootstrapDesignSystem()

bootstrapApplication(App, appConfig).catch(err => console.error(err))
