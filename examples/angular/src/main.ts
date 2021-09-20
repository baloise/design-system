import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { AppModule } from './app/app.module'
import { environment } from './environments/environment'

if ((window as any).BaloiseDesignSystem.isSupportedBrowser()) {
  if (environment.production) {
    enableProdMode()
  }

  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err))
} else {
  // redirect to a static browser support page
}
