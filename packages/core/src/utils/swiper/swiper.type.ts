import { HTMLStencilElement } from '@stencil/core/internal'
import { BalLanguage } from '../config'
import { SwiperUtil } from './swiper.util'

export interface SwiperControlItem {
  value: number
  label: string
}

export type SwiperChildItem = HTMLStencilElement & {
  label: string
  setFocus(): Promise<void>
}

export interface SwiperSlide {
  el: SwiperChildItem
  transformNext: number
  transformActive: number
  isLast: boolean
  isFirst: boolean
  index: number
  total: number
}

export type SwiperControl = 'small' | 'large' | 'dots' | 'none' | 'tabs'
export type SwiperGapSpace = 'normal' | 'medium' | 'none'
export type SwiperItemsPerView = 'auto' | 1 | 2 | 3 | 4

export type SwiperInterface = {
  el: HTMLElement | HTMLStencilElement
  swiper: SwiperUtil

  language: BalLanguage
  hasAnimated: boolean
  isMobile: boolean
  inverted: boolean

  swiperGetAllChildrenElements(): SwiperChildItem[]
  swiperOnChange(index: number): void
}
