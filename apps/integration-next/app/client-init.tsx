'use client'

import { useEffect } from 'react'

export function ClientInit() {
  useEffect(() => {
    void (async () => {
      const { defineCustomElements } = await import('@baloise/ds-core/loader')
      const { initializeDesignSystem } = await import('@baloise/ds-core')
      initializeDesignSystem({ animated: false })
      await defineCustomElements()
    })()
  }, [])

  return null
}
