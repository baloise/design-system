export * from './interfaces'

export * from './components/form/bal-select/utils/bal-option.type'
export * from './components/bal-tabs/bal-tab.type'
export * from './components/form/bal-file-upload/bal-file-upload.type'
export * from './components/notice/bal-modal/bal-modal.type'

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
