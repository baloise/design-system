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
import './components/bal-navigation/bal-navigation.interfaces'
import './components/bal-pagination/bal-pagination.interfaces'
import './components/bal-popover/bal-popover.interfaces'
import './components/bal-popup/bal-popup.interfaces'
import './components/bal-progress-bar/bal-progress-bar.interfaces'
import './components/bal-shape/bal-shape.interfaces'
import './components/bal-stage/bal-stage.interfaces'
import './components/bal-steps/bal-steps.interfaces'
import './components/bal-tabs/bal-tabs.interfaces'
import './components/bal-tag/bal-tag.interfaces'
import './components/typography/bal-heading/bal-heading.interfaces'
import './components/typography/bal-label/bal-label.interfaces'
import './components/typography/bal-text/bal-text.interfaces'
import './components/layout/bal-content/bal-content.interfaces'
import './components/layout/bal-divider/bal-divider.interfaces'
import './components/layout/bal-stack/bal-stack.interfaces'
import './components/form/bal-checkbox/bal-checkbox.interfaces'
import './components/form/bal-datepicker/bal-datepicker.interfaces'
import './components/form/bal-file-upload/bal-file-upload.interfaces'
import './components/form/bal-field/bal-field.interfaces'
import './components/form/bal-form-grid/bal-form-gird.interfaces'
import './components/form/bal-input/bal-input.interfaces'
import './components/form/bal-input-slider/bal-input-slider.interfaces'
import './components/form/bal-input-stepper/bal-input-stepper.interfaces'
import './components/form/bal-number-input/bal-number-input.interfaces'
import './components/form/bal-time-input/bal-time-input.interfaces'
import './components/form/bal-radio/bal-radio.interfaces'
import './components/form/bal-select/bal-select.interfaces'
import './components/form/bal-textarea/bal-textarea.interfaces'
import './components/notice/bal-modal/bal-modal.interfaces'
import './components/notice/bal-notification/bal-notification.interfaces'
import './components/notice/bal-sheet/bal-sheet.interfaces'
import './components/notice/bal-snackbar/bal-snackbar.interfaces'
import './components/notice/bal-toast/bal-toast.interfaces'

export * from './components'
export * from './index'

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
