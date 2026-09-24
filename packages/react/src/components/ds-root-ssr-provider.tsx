import type { ReactNode } from 'react'
import type { DsConfig, DsLanguage } from '@baloise/ds-core'
import { omitUndefined, parseAllowedLanguages } from './ds-root-provider.shared'
import { DsRootSSRBoot } from './ds-root-ssr-boot'

export type DsRootSSRProviderProps = Omit<DsConfig, 'allowedLanguages'> & {
  allowedLanguages?: DsLanguage[] | string
  children?: ReactNode
}

// Does not render `<ds-root>` — its SSR wrapper flattens children into static HTML.
export function DsRootSSRProvider({ children, allowedLanguages, ...config }: DsRootSSRProviderProps) {
  const resolvedConfig = omitUndefined({
    ...config,
    allowedLanguages: parseAllowedLanguages(allowedLanguages),
  })

  return (
    <>
      <DsRootSSRBoot config={resolvedConfig} />
      {children}
    </>
  )
}
