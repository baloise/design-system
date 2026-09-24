'use client'

import { useEffect, useRef } from 'react'
import type { DsConfig } from '@helvetia-design/core'
import { ensureInit } from './ds-root-provider.shared'

export function DsRootSSRBoot({ config }: { config: DsConfig }) {
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) {
      return
    }
    initialized.current = true

    ensureInit(config)
    void import('@helvetia-design/core/loader').then(({ defineCustomElements }) => defineCustomElements())
  }, [config])

  return null
}
