export namespace DS {
  export const CAROUSEL_VARIANTS = ['slide', 'tile'] as const
  export type CarouselVariant = (typeof CAROUSEL_VARIANTS)[number]

  export const CAROUSEL_CONTROLS = ['dots', 'large', 'none'] as const
  export type CarouselControls = (typeof CAROUSEL_CONTROLS)[number]

  export const CAROUSEL_ITEM_COLORS = ['', 'purple', 'green', 'red', 'yellow'] as const
  export type CarouselItemColor = (typeof CAROUSEL_ITEM_COLORS)[number]
}

export interface CarouselCustomEvent<T> extends CustomEvent<T> {
  detail: T
  target: HTMLDsCarouselElement
}

export type CarouselChangeDetail = { value: string }
export type CarouselChange = CarouselCustomEvent<CarouselChangeDetail>
