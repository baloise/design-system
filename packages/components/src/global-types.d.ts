export enum FileUploadRejectionReason {
  BAD_EXTENSION = 'BAD_EXTENSION',
  FILE_TOO_BIG = 'FILE_TOO_BIG',
  FILE_SIZE_SUM_TOO_BIG = 'FILE_SIZE_SUM_TOO_BIG',
  TOO_MANY_FILES = 'TOO_MANY_FILES',
  DUPLICATED_FILE = 'DUPLICATED_FILE',
}

export interface OverlayEventDetail<T = any> {
  data?: T
  role?: string
}

export interface FileUploadRejectedFile {
  reasons: FileUploadRejectionReason[]
  file: File
}

export const enum AccordionState {
  Collapsed = 1 << 0,
  Collapsing = 1 << 1,
  Expanded = 1 << 2,
  Expanding = 1 << 3,
}

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
