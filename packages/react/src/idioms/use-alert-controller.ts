import { useCallback, useRef } from 'react'
import type { Alert, AlertController } from '@baloise/ds-core'

export function useAlertController(controller: AlertController) {
  const idRef = useRef<string>(undefined)

  const present = useCallback(
    async (options: Alert) => {
      idRef.current = await controller.create(options)
    },
    [controller],
  )

  const dismiss = useCallback(async () => {
    if (idRef.current) await controller.remove(idRef.current)
  }, [controller])

  return [present, dismiss] as const
}
