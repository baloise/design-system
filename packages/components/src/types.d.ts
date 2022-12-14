export * from './components'
export * from './props'
export * from './events'
export * from './index'

export interface I18n<T> {
  en: T
  de: T
  fr: T
  it: T
  nl: T
  es: T
  pl: T
  pt: T
  sv: T
  fi: T
}

export const enum AccordionState {
  Collapsed = 1 << 0,
  Collapsing = 1 << 1,
  Expanded = 1 << 2,
  Expanding = 1 << 3,
}
