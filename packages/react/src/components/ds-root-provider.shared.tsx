import { ComponentProps, ComponentRef, forwardRef, type ComponentType } from 'react'
import { initializeDesignSystem, type DsConfig, type DsLanguage } from '@helvetia-design/core'
import type { DsRoot as DsRootClient } from '../generated/components'

type DsRootProps = ComponentProps<typeof DsRootClient>

export type DsRootProviderProps = Omit<DsRootProps, 'allowedLanguages'> & {
  allowedLanguages?: DsLanguage[] | string
}

type DsRootComponent = ComponentType<DsRootProps>

export function serializeAllowedLanguages(value: DsLanguage[] | string | undefined) {
  return Array.isArray(value) ? value.join(',') : value
}

export function parseAllowedLanguages(value: DsLanguage[] | string | undefined) {
  if (Array.isArray(value)) {
    return value
  }

  if (!value) {
    return undefined
  }

  return value.split(',').map(language => language.trim()) as DsLanguage[]
}

export function omitUndefined<T extends object>(value: T): Partial<T> {
  return Object.fromEntries(Object.entries(value).filter(([, item]) => item !== undefined)) as Partial<T>
}

export function ensureInit(config: DsConfig) {
  if (typeof window === 'undefined') {
    return
  }

  const win = window as Window & { DesignSystem?: { config?: unknown } }
  if (win.DesignSystem?.config) {
    return
  }

  initializeDesignSystem({
    ...config,
  })
}

export function createDsRootProvider(DsRoot: DsRootComponent) {
  return forwardRef<ComponentRef<typeof DsRootClient>, DsRootProviderProps>(function DsRootProvider(
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
        icons={icons}
        legalLinks={legalLinks}
        legalText={legalText}
        socialLinks={socialLinks}
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
}
