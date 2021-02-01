import { Plugin } from 'vue'
import { defineCustomElements, applyPolyfills } from '@baloise/ui-library/loader'

export const BaloiseUILibrary: Plugin = {
  async install(app) {
    await applyPolyfills()
    await defineCustomElements()
    app.config.isCustomElement = tag => tag.startsWith('bal-')
  },
}

// export const BalUiLibraryPlugin: PluginObject<BalUiLibraryPluginOption> = {
//   install(_VueInstance, options): void {
//     options = {
//       ...BalUiLibraryPluginOptionDefaults,
//       ...options,
//     }

//     if (options.defineCustomeElements === true) {
//       applyPolyfills().then(() => defineCustomElements())
//     }

//     ;(_VueInstance as any).$balUtils = balUtils
//     _VueInstance.prototype.$balUtils = balUtils
//     ;(_VueInstance as any).$balToast = balToastController
//     _VueInstance.prototype.$balToast = balToastController
//     ;(_VueInstance as any).$balSnackbar = balSnackbarController
//     _VueInstance.prototype.$balSnackbar = balSnackbarController

//     addFilters(_VueInstance)
//   },
// }
