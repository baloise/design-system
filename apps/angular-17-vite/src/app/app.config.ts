/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { ApplicationConfig, importProvidersFrom } from '@angular/core'

import { BaloiseDesignSystemModule } from '@baloise/design-system-components-angular/standalone'

// import { BaloiseDesignSystemModule } from '@baloise/design-system-components-angular/legacy'
// import { BaloiseDesignSystemModule } from '@baloise/design-system-components-angular'

export const appConfig: ApplicationConfig = {
  providers: [importProvidersFrom(BaloiseDesignSystemModule.forRoot())],
}
