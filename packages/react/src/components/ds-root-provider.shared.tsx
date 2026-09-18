import { ComponentProps, ComponentRef, forwardRef, type ComponentType } from 'react'
import { initializeDesignSystem, type DsConfig, type DsLanguage } from '@baloise/ds-core'
import type { DsRoot as DsRootClient } from '../generated/components'

type DsRootProps = ComponentProps<typeof DsRootClient>

export type DsRootProviderProps = Omit<DsRootProps, 'allowedLanguages'> & {
  allowedLanguages?: DsLanguage[] | string
  icons?: DsConfig['icons']
  legalLinks?: DsConfig['legalLinks']
  legalText?: DsConfig['legalText']
  socialLinks?: DsConfig['socialLinks']
}

type DsRootComponent = ComponentType<DsRootProps>

/**
 * Side effect the client entry point needs to run before the first component renders, but that must
 * not be statically imported here: this module is also reachable from the Node (`.server`) entry, and
 * anything it imports from `@baloise/ds-core/components` would pull the browser-only custom elements
 * build into the server bundle.
 */
type OnInit = () => void

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

function ensureInit(config: DsConfig, onInit?: OnInit) {
  if (typeof window === 'undefined') {
    return
  }

  // Called unconditionally (not gated by the `DesignSystem.config` check below) since it's independent
  // of whether the config has already been initialized.
  onInit?.()

  const win = window as Window & { DesignSystem?: { config?: unknown } }
  if (win.DesignSystem?.config) {
    return
  }

  initializeDesignSystem({
    ...config,
    httpFormSubmit: false,
  })
}

export function createDsRootProvider(DsRoot: DsRootComponent, onInit?: OnInit) {
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
      onInit,
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
}
