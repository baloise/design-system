/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace BalProps {
  export type BalCarouselItemColor = 'white' | 'green' | 'yellow' | 'red' | 'purple'
}

namespace BalEvents {
  export interface BalCarouselCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalCarouselElement
  }

  export type BalCarouselChangeDetail = number | undefined
  export type BalCarouselChange = BalCarouselCustomEvent<BalCarouselChangeDetail>

  export interface BalCarouselItemCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalCarouselItemElement
  }

  export type BalCarouselItemBlurDetail = void
  export type BalCarouselItemBlur = BalCarouselItemCustomEvent<BalCarouselItemBlurDetail>

  export type BalCarouselItemFocusDetail = void
  export type BalCarouselItemFocus = BalCarouselItemCustomEvent<BalCarouselItemFocusDetail>

  export type BalCarouselItemNavigateDetail = MouseEvent
  export type BalCarouselItemNavigate = BalCarouselItemCustomEvent<BalCarouselItemNavigateDetail>
}
