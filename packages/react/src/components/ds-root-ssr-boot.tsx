'use client'

import { useEffect, useRef } from 'react'
import type { DsConfig } from '@baloise/ds-core'
import { ensureInit } from './ds-root-provider.shared'

export function DsRootSSRBoot({ config }: { config: DsConfig }) {
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) {
      return
    }
    initialized.current = true

    ensureInit(config)
    void import('@baloise/ds-core/loader').then(({ defineCustomElements }) => defineCustomElements())
  }, [config])

  return null
}
