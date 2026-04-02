/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace BalProps {
  export type BalAccordionSummaryLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
  export type BalAccordionMarker = '' | 'plus' | 'plus-minus' | 'none'
  export type BalAccordionMarkerPosition = '' | 'left' | 'right'
}

namespace BalEvents {
  export interface BalAccordionCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalAccordionElement
  }

  export type BalAccordionToggleDetail = { group?: string; id: string; open: boolean }
  export type BalAccordionToggle = BalAccordionCustomEvent<BalAccordionToggleDetail>
}
