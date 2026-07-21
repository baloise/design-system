import { EventEmitter } from '@stencil/core'
import { DropdownValueUtil } from './value'
import { BalOption } from './option'
import { DropdownFocus } from './focus'
import { DropdownPopupUtil } from './popup'
import { HTMLStencilElement } from '@stencil/core/internal'

export type DropdownComponent = DropdownFocus & {
  el: HTMLElement | HTMLStencilElement
  selectEl: HTMLSelectElement | undefined
  panelEl: HTMLDivElement | undefined
  nativeEl: HTMLInputElement | undefined
  listEl: HTMLBalOptionListElement | undefined

  valueUtil: DropdownValueUtil
  popupUtil: DropdownPopupUtil

  multiple: boolean
  chips: boolean
  readonly: boolean
  disabled: boolean
  clearable: boolean
  hasFocus: boolean
  isExpanded: boolean
  isAutoFilled: boolean
  isKeyboardMode: boolean
  inputLabel: string

  nativeOptions: string[]
  choices: BalOption[]
  options: BalOption[]
  rawOptions: BalOption[]
  rawValue: string[]
  value?: string | string[]
  initialValue?: string | string[]

  panelCleanup?: () => void
  balChange: EventEmitter<BalEvents.BalDropdownChangeDetail>
  balBlur: EventEmitter<BalEvents.BalDropdownBlurDetail>
  balFocus: EventEmitter<BalEvents.BalDropdownFocusDetail>
}
