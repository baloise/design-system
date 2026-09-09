import { dsSnackbarController } from '@baloise/ds-core'
import { useAlertController } from './use-alert-controller'

export function useSnackbar() {
  return useAlertController(dsSnackbarController)
}
