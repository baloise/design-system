/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

declare namespace BalProps {}

declare namespace BalEvents {}

import './components/bal-accordion/bal-accordion.interfaces'
import './components/bal-app/bal-app.interfaces'
import './components/bal-badge/bal-badge.interfaces'
import './components/bal-button/bal-button.interfaces'
import './components/bal-card/bal-card.interfaces'
import './components/bal-carousel/bal-carousel.interfaces'
import './components/bal-close/bal-close.interfaces'
import './components/bal-data/bal-data.interfaces'
import './components/bal-dropdown/bal-dropdown.interfaces'
import './components/bal-icon/bal-icon.interfaces'
import './components/bal-list/bal-list.interfaces'
import './components/bal-logo/bal-logo.interfaces'
import './components/bal-nav/bal-nav-meta-bar/bal-nav-meta-bar.interfaces'
import './components/bal-nav/bal-nav-link/bal-nav-link.interfaces'
import './components/bal-nav/bal-nav-link-group/bal-nav-link-group.interfaces'
import './components/bal-nav/bal-nav-link-grid-col/bal-nav-link-grid-col.interfaces'
import './components/bal-nav/bal-nav-menu-bar/bal-nav-menu-bar.interfaces'
import './components/bal-nav/bal-nav-menu-flyout/bal-nav-menu-flyout.interfaces'
import './components/bal-nav/bal-nav.interfaces'
import './components/bal-navbar/bal-navbar.interfaces'
import './components/bal-option/bal-option.interfaces'
import './components/bal-option-list/bal-option-list.interfaces'
import './components/bal-pagination/bal-pagination.interfaces'
import './components/bal-popover/bal-popover.interfaces'
import './components/bal-popup/bal-popup.interfaces'
import './components/bal-progress-bar/bal-progress-bar.interfaces'
import './components/bal-shape/bal-shape.interfaces'
import './components/bal-stage/bal-stage.interfaces'
import './components/bal-steps/bal-steps.interfaces'
import './components/bal-tabs/bal-tabs.interfaces'
import './components/bal-tag/bal-tag.interfaces'
import './components/bal-tooltip/bal-tooltip.interfaces'
import './components/bal-heading/bal-heading.interfaces'
import './components/bal-label/bal-label.interfaces'
import './components/bal-text/bal-text.interfaces'
import './components/bal-content/bal-content.interfaces'
import './components/bal-divider/bal-divider.interfaces'
import './components/bal-stack/bal-stack.interfaces'
import './components/bal-spinner/bal-spinner.interfaces'
import './components/bal-checkbox/bal-checkbox.interfaces'
import './components/bal-date/bal-date.interfaces'
import './components/bal-date/bal-date-calendar/bal-date-calendar.interfaces'
import './components/bal-file-upload/bal-file-upload.interfaces'
import './components/bal-field/bal-field.interfaces'
import './components/bal-form-grid/bal-form-gird.interfaces'
import './components/bal-input/bal-input.interfaces'
import './components/bal-input-slider/bal-input-slider.interfaces'
import './components/bal-input-stepper/bal-input-stepper.interfaces'
import './components/bal-number-input/bal-number-input.interfaces'
import './components/bal-time-input/bal-time-input.interfaces'
import './components/bal-radio/bal-radio.interfaces'
import './components/bal-select/bal-select.interfaces'
import './components/bal-textarea/bal-textarea.interfaces'
import './components/bal-date/bal-date-calendar/bal-date-calendar.interfaces'
import './components/bal-modal/bal-modal.interfaces'
import './components/bal-notification/bal-notification.interfaces'
import './components/bal-sheet/bal-sheet.interfaces'
import './components/bal-snackbar/bal-snackbar.interfaces'
import './components/bal-toast/bal-toast.interfaces'
import './components/bal-segment/bal-segment.interfaces'

export * from './components'
export * from './index'
export { Attributes } from './utils/attributes'

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

export type I18nKeys = keyof I18n<any>
