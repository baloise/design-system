/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace DS {
  export type AccordionSummaryLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
  export type AccordionMarker = '' | 'plus' | 'plus-minus' | 'none'
  export type AccordionMarkerPosition = '' | 'left' | 'right'

  export interface AccordionCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalAccordionElement
  }

  export type AccordionToggleDetail = { group?: string; id: string; open: boolean }
  export type AccordionToggle = AccordionCustomEvent<AccordionToggleDetail>
}
