import { dsSnackbarController } from '@baloise/ds-core'
import { defineCustomElement as defineDsSnackbar } from '@baloise/ds-core/components/ds-snackbar.js'
import { useAlertController } from './use-alert-controller'

export function useSnackbar() {
  defineDsSnackbar()
  return useAlertController(dsSnackbarController)
}
