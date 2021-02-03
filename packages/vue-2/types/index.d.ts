import Vue from 'vue'
import { BalUtilsStatic } from '@baloise/ui-library-utils'
import { BalToastController, BalSnackbarController } from '@baloise/ui-library'

declare module 'vue/types/vue' {
  interface VueConstructor {
    $balUtils: BalUtilsStatic
    $balToast: BalToastController
    $balSnackbar: BalSnackbarController
  }

  interface Vue {
    $balUtils: BalUtilsStatic
    $balToast: BalToastController
    $balSnackbar: BalSnackbarController
  }
}

export * from '../dist/index.d'
