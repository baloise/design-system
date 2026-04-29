/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import './components/accordion/accordion.interfaces'
import './components/app/app.interfaces'
import './components/badge/badge.interfaces'
import './components/button/button.interfaces'
import './components/card/card.interfaces'
import './components/carousel/carousel.interfaces'
import './components/close/close.interfaces'
import './components/data/data.interfaces'
import './components/dropdown/dropdown.interfaces'
import './components/icon/icon.interfaces'
import './components/list/list.interfaces'
import './components/logo/logo.interfaces'
import './components/nav/nav-meta-bar/nav-meta-bar.interfaces'
import './components/nav/nav-link/nav-link.interfaces'
import './components/nav/nav-link-group/nav-link-group.interfaces'
import './components/nav/nav-link-grid-col/nav-link-grid-col.interfaces'
import './components/nav/nav-menu-bar/nav-menu-bar.interfaces'
import './components/nav/nav-menu-flyout/nav-menu-flyout.interfaces'
import './components/nav/nav.interfaces'
import './components/navbar/navbar.interfaces'
import './components/option/option.interfaces'
import './components/option-list/option-list.interfaces'
import './components/pagination/pagination.interfaces'
import './components/popover/popover.interfaces'
import './components/popup/popup.interfaces'
import './components/progress-bar/progress-bar.interfaces'
import './components/shape/shape.interfaces'
import './components/stage/stage.interfaces'
import './components/steps/steps.interfaces'
import './components/tabs/tabs.interfaces'
import './components/tag/tag.interfaces'
import './components/tooltip/tooltip.interfaces'
import './components/heading/heading.interfaces'
import './components/label/label.interfaces'
import './components/text/text.interfaces'
import './components/content/content.interfaces'
import './components/divider/divider.interfaces'
import './components/stack/stack.interfaces'
import './components/spinner/spinner.interfaces'
import './components/checkbox/checkbox.interfaces'
import './components/date/date.interfaces'
import './components/date/date-calendar/date-calendar.interfaces'
import './components/file-upload/file-upload.interfaces'
import './components/field/field.interfaces'
import './components/form-grid/form-gird.interfaces'
import './components/input/input.interfaces'
import './components/input-slider/input-slider.interfaces'
import './components/input-stepper/input-stepper.interfaces'
import './components/number-input/number-input.interfaces'
import './components/time-input/time-input.interfaces'
import './components/radio/radio.interfaces'
import './components/select/select.interfaces'
import './components/textarea/textarea.interfaces'
import './components/date/date-calendar/date-calendar.interfaces'
import './components/modal/modal.interfaces'
import './components/notification/notification.interfaces'
import './components/sheet/sheet.interfaces'
import './components/alert/snackbar/snackbar.interfaces'
import './components/alert/toast/toast.interfaces'
import './components/segment/segment-item.interfaces'

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
