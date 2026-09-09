import { dsToastController } from '@baloise/ds-core'
import { useAlertController } from './use-alert-controller'

export function useToast() {
  return useAlertController(dsToastController)
}
