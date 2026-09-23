'use client'

import { dsToastController } from '@helvetia-design/core'
import { defineCustomElement as defineDsToast } from '@helvetia-design/core/components/ds-toast.js'
import { useAlertController } from './use-alert-controller'

export function useToast() {
  defineDsToast()
  return useAlertController(dsToastController)
}
