import Vue, { PluginObject } from 'vue'
import { defineCustomElements, applyPolyfills } from '@baloise/ui-library/loader'
import { balSnackbarController, balToastController } from '@baloise/ui-library'

import { addFilters } from './filters'

Vue.config.ignoredElements = [/bal-\w*/]

export type BalUiLibraryPluginOption = {
  defineCustomeElements: boolean
}

const BalUiLibraryPluginOptionDefaults: BalUiLibraryPluginOption = {
  defineCustomeElements: true,
}

export const BalUiLibraryPlugin: PluginObject<BalUiLibraryPluginOption> = {
  install(_VueInstance, options): void {
    options = {
      ...BalUiLibraryPluginOptionDefaults,
      ...options,
    }

    if (options.defineCustomeElements === true) {
      applyPolyfills().then(() => defineCustomElements())
    }

    ;(_VueInstance as any).$balToast = balToastController
    _VueInstance.prototype.$balToast = balToastController
    ;(_VueInstance as any).$balSnackbar = balSnackbarController
    _VueInstance.prototype.$balSnackbar = balSnackbarController

    addFilters(_VueInstance)
  },
}
