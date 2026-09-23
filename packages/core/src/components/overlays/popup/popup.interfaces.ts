export const POPUP_PLACEMENTS = [
  'top',
  'top-start',
  'top-end',
  'right',
  'right-start',
  'right-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
] as const

export type PopupPlacement = (typeof POPUP_PLACEMENTS)[number]

export const POPUP_ROLES = ['dialog', 'listbox', 'menu', 'tree', 'grid'] as const

export type PopupRole = (typeof POPUP_ROLES)[number]

export interface PopupCustomEvent<T> extends CustomEvent<T> {
  detail: T
  target: HTMLDsPopupElement
}

export type PopupPresentDetail = { trigger: HTMLElement | undefined }
export type PopupDismissDetail = { trigger: HTMLElement | undefined }
