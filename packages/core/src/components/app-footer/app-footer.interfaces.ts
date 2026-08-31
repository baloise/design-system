export const APP_FOOTER_CONTAINERS = ['default', 'fluid', 'compact', ''] as const
export type AppFooterContainer = (typeof APP_FOOTER_CONTAINERS)[number]

export interface AppFooterLink {
  label: string
  href: string
  target?: '_self' | '_blank' | '_parent' | '_top'
  rel?: string
}

export interface AppFooterSocialLink extends AppFooterLink {
  icon: string
  ariaLabel?: string
}

export interface AppFooterLanguageChangeDetail {
  language: string
}

export interface AppFooterCustomEvent<T> extends CustomEvent<T> {
  detail: T
  target: HTMLDsAppFooterElement
}
