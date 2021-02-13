import { inject, Plugin } from 'vue'
import { defineCustomElements, applyPolyfills } from '@baloise/ui-library/loader'
import {
  balToastController,
  balSnackbarController,
  BalToastController,
  BalSnackbarController,
} from '@baloise/ui-library'
import { applyFilters } from './filters'

export const baloiseUiLibrary: Plugin = {
  async install(app) {
    await applyPolyfills()
    await defineCustomElements()

    app.config.isCustomElement = tag => tag.startsWith('bal-')

    applyFilters(app)

    app.config.globalProperties.$balToast = balToastController
    app.config.globalProperties.$balSnackbar = balSnackbarController

    app.provide<BalToastController>('balToast', balToastController)
    app.provide<BalSnackbarController>('balSnackbar', balSnackbarController)
  },
}

export const useToast = (): BalToastController => inject<BalToastController>('balToast', balToastController)

export const useSnackbar = (): BalSnackbarController =>
  inject<BalSnackbarController>('balSnackbar', balSnackbarController)
