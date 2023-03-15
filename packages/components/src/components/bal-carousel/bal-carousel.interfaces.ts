/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace BalProps {
  export type BalCarouselItemColor = 'white' | 'green' | 'yellow' | 'red' | 'purple'
}

namespace BalEvents {
  export type BalCarouselChangeDetail = number | undefined
  export interface BalCarouselChange extends CustomEvent {
    detail: BalCarouselChangeDetail
    target: HTMLBalCarouselElement
  }
}
