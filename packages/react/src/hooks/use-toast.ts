import { dsToastController } from '@baloise/ds-core'
import { defineCustomElement as defineDsToast } from '@baloise/ds-core/components/ds-toast.js'
import { useAlertController } from './use-alert-controller'

export function useToast() {
  defineDsToast()
  return useAlertController(dsToastController)
}
