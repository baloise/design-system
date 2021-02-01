import { Plugin } from 'vue'
import { defineCustomElements, applyPolyfills } from '@baloise/ui-library/loader'
import {
  balToastController,
  balSnackbarController,
  BalToastController,
  BalSnackbarController,
} from '@baloise/ui-library'
import * as balUtils from '@baloise/ui-library-utils'

export const BaloiseUILibrary: Plugin = {
  async install(app) {
    await applyPolyfills()
    await defineCustomElements()

    app.config.isCustomElement = tag => tag.startsWith('bal-')

    app.config.globalProperties.$balUtils = balUtils
    app.config.globalProperties.$balToast = balToastController
    app.config.globalProperties.$balSnackbar = balSnackbarController

    app.provide<typeof balUtils>('balUtils', balUtils)
    app.provide<BalToastController>('balToast', balToastController)
    app.provide<BalSnackbarController>('balSnackbar', balSnackbarController)
  },
}
