import Vue, { PluginObject } from 'vue'
import { defineCustomElements, applyPolyfills } from '@baloise/ui-library/loader'
import * as balUtils from '@baloise/ui-library-utils'
import { addFilters } from './filters'
import { balSnackbarController, balToastController } from '@baloise/ui-library'

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

    _VueInstance.$balUtils = balUtils
    _VueInstance.prototype.$balUtils = balUtils

    _VueInstance.$balToast = balToastController
    _VueInstance.prototype.$balToast = balToastController

    _VueInstance.$balSnackbar = balSnackbarController
    _VueInstance.prototype.$balSnackbar = balSnackbarController

    addFilters(_VueInstance)
  },
}
