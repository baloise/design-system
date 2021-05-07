import Vue, { PluginObject } from 'vue'
import { defineCustomElements, applyPolyfills } from '@baloise/ui-library/loader'
import { balSnackbarController, balToastController } from '@baloise/ui-library'

import { addFilters } from './generated/filters'

Vue.config.ignoredElements = [/bal-\w*/]

export type BaloiseDesignSystemPluginOption = {
  defineCustomeElements: boolean
}

const BaloiseDesignSystemPluginOptionDefaults: BaloiseDesignSystemPluginOption = {
  defineCustomeElements: true,
}

export const BaloiseDesignSystem: PluginObject<BaloiseDesignSystemPluginOption> = {
  install(_VueInstance, options): void {
    options = {
      ...BaloiseDesignSystemPluginOptionDefaults,
      ...options,
    }
    ;(_VueInstance as any).$balToast = balToastController
    _VueInstance.prototype.$balToast = balToastController
    ;(_VueInstance as any).$balSnackbar = balSnackbarController
    _VueInstance.prototype.$balSnackbar = balSnackbarController

    addFilters(_VueInstance)

    if (options.defineCustomeElements === true) {
      applyPolyfills().then(() => defineCustomElements())
    }
  },
}
