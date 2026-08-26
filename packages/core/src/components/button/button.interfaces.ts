import { BRAND_ICON_SIZES, type IconSize } from '../brand-icon/brand-icon.interfaces'

export const BUTTON_GROUP_ALIGNMENTS = ['right', 'center', 'left'] as const
export const BUTTON_GROUP_DIRECTIONS = ['auto', 'row', 'column'] as const
export const BUTTON_COLORS = [
  'primary',
  'secondary',
  'tertiary',
  'ghost',
  'brand-purple',
  'brand-red',
  'brand-yellow',
  'brand-green',
  'info',
  'success',
  'warning',
  'danger',
  'link',
] as const
export const BUTTON_ELEMENT_TYPES = ['button', 'reset', 'submit'] as const
export const BUTTON_SIZES = ['sm', 'lg'] as const
export const BUTTON_TARGETS = ['_blank', '_parent', '_self', '_top', ''] as const
export const BUTTON_BRAND_SIZES = BRAND_ICON_SIZES

export type ButtonGroupAlignment = (typeof BUTTON_GROUP_ALIGNMENTS)[number] | undefined
export type ButtonGroupDirection = (typeof BUTTON_GROUP_DIRECTIONS)[number]
export type ButtonColor = (typeof BUTTON_COLORS)[number]
export type ButtonElementType = (typeof BUTTON_ELEMENT_TYPES)[number]
export type ButtonSize = (typeof BUTTON_SIZES)[number] | undefined
export type ButtonTarget = (typeof BUTTON_TARGETS)[number]
export type ButtonBrandSize = IconSize
export type ButtonAria = {
  controls?: string
  title?: string
  label?: string
  haspopup?: string
}

export interface ButtonCustomEvent<T> extends CustomEvent<T> {
  detail: T
  target: HTMLDsButtonElement
}

export type ButtonBlurDetail = void
export type ButtonBlur = ButtonCustomEvent<ButtonBlurDetail>

export type ButtonFocusDetail = void
export type ButtonFocus = ButtonCustomEvent<ButtonFocusDetail>

export type ButtonClickDetail = MouseEvent
export type ButtonClick = ButtonCustomEvent<ButtonClickDetail>

export type ButtonNavigateDetail = MouseEvent
export type ButtonNavigate = ButtonCustomEvent<ButtonNavigateDetail>

export type ButtonDidRenderDetail = void
export type ButtonDidRender = ButtonCustomEvent<ButtonDidRenderDetail>
