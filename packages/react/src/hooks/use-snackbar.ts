'use client'

import { dsSnackbarController } from '@helvetia-design/core'
import { defineCustomElement as defineDsSnackbar } from '@helvetia-design/core/components/ds-snackbar.js'
import { useAlertController } from './use-alert-controller'

export function useSnackbar() {
  defineDsSnackbar()
  return useAlertController(dsSnackbarController)
}
