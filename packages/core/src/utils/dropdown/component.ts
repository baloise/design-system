import { EventEmitter, FunctionalComponent } from '@stencil/core'
import { DropdownValueUtil } from './value'
import { BalOption } from './option'
import { DropdownFocus } from './focus'
import { DropdownPopupUtil } from './popup'

export type DropdownComponent = DropdownFocus & {
  el: HTMLElement
  nativeEl: HTMLSelectElement | HTMLInputElement | undefined
  panelEl: HTMLDivElement | undefined
  listEl: HTMLBalOptionListElement | undefined

  valueUtil: DropdownValueUtil
  popupUtil: DropdownPopupUtil

  name: string
  icon: string
  placeholder: string
  autocomplete: string

  multiple: boolean
  chips: boolean
  readonly: boolean
  disabled: boolean
  required: boolean
  loading: boolean
  clearable: boolean
  invalid: boolean

  hasFocus: boolean
  isExpanded: boolean
  isAutoFilled: boolean

  inputValue: string
  inputContent?: FunctionalComponent | string

  nativeOptions: string[]
  options: BalOption[]
  rawOptions: BalOption[]
  rawValue: string[]
  value?: string | string[]
  initialValue?: string | string[]
  valueChanged(newValue: string | string[] | undefined, oldValue: string | string[] | undefined)

  handleAutoFill(ev: Event)
  panelCleanup?: () => void

  // interfaces to other utils
  toggleList()
  updateRawValueBySelection(newRawValue: string[])

  balChange: EventEmitter<BalEvents.BalDropdownChangeDetail>
}
