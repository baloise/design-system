export interface FooterLink {
  label: string
  href: string
  target?: '_self' | '_blank' | '_parent' | '_top'
  rel?: string
}

export interface FooterSocialLink extends FooterLink {
  icon: string
  ariaLabel?: string
}

export interface FooterLanguageChangeDetail {
  language: string
}

export interface FooterCustomEvent<T> extends CustomEvent<T> {
  detail: T
  target: HTMLDsFooterElement
}
