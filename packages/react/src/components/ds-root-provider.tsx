'use client'

import { ComponentProps, ComponentRef, forwardRef } from 'react'
import { initializeDesignSystem, type DsConfig, type DsLanguage } from '@baloise/ds-core'
import { DsRoot } from '../generated/components'

type DsRootProps = ComponentProps<typeof DsRoot>

export type DsRootProviderProps = Omit<DsRootProps, 'allowedLanguages'> & {
  allowedLanguages?: DsLanguage[] | string
  icons?: DsConfig['icons']
  legalLinks?: DsConfig['legalLinks']
  legalText?: DsConfig['legalText']
  socialLinks?: DsConfig['socialLinks']
}

function serializeAllowedLanguages(value: DsLanguage[] | string | undefined) {
  return Array.isArray(value) ? value.join(',') : value
}

function parseAllowedLanguages(value: DsLanguage[] | string | undefined) {
  if (Array.isArray(value)) {
    return value
  }

  if (!value) {
    return undefined
  }

  return value.split(',').map(language => language.trim()) as DsLanguage[]
}

function omitUndefined<T extends object>(value: T): Partial<T> {
  return Object.fromEntries(Object.entries(value).filter(([, item]) => item !== undefined)) as Partial<T>
}

function ensureInit(config: DsConfig) {
  if (typeof window === 'undefined') {
    return
  }

  const win = window as Window & { DesignSystem?: { config?: unknown } }
  if (win.DesignSystem?.config) {
    return
  }

  initializeDesignSystem({
    ...config,
    httpFormSubmit: false,
  })
}

export const DsRootProvider = forwardRef<ComponentRef<typeof DsRoot>, DsRootProviderProps>(function DsRootProvider(
  {
    icons,
    legalLinks,
    legalText,
    socialLinks,
    allowedLanguages,
    brand,
    region,
    language,
    fallbackLanguage,
    animated,
    ...props
  },
  ref,
) {
  ensureInit(
    omitUndefined({
      brand,
      region,
      language,
      fallbackLanguage,
      animated,
      allowedLanguages: parseAllowedLanguages(allowedLanguages),
      icons,
      legalLinks,
      legalText,
      socialLinks,
    }),
  )

  return (
    <DsRoot
      {...props}
      ref={ref}
      {...omitUndefined({
        brand,
        region,
        language,
        fallbackLanguage,
        animated,
        allowedLanguages: serializeAllowedLanguages(allowedLanguages),
      })}
    />
  )
})
