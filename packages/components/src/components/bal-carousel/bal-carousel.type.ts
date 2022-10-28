export interface ControlItem {
  value: number
  label: string
}

export interface BalCarouselItemData {
  clientWidth: number
  label: string
}

export interface BalSlide {
  el: HTMLBalCarouselItemElement
  data: BalCarouselItemData
  transformNext: number
  transformActive: number
  // transformPrevious: number
  isLast: boolean
  isFirst: boolean
  index: number
  total: number
}
