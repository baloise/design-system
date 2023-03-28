/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace BalProps {
  export type BalAccordionColor = 'primary' | 'info'
}

namespace BalEvents {
  export type BalAccordionChangeDetail = boolean
  export interface BalAccordionChange extends CustomEvent {
    detail: BalAccordionChangeDetail
    target: HTMLBalAccordionElement
  }

  export type BalAccordionWillAnimateDetail = void
  export interface BalAccordionWillAnimate extends CustomEvent {
    detail: BalAccordionWillAnimateDetail
    target: HTMLBalAccordionElement
  }

  export type BalAccordionDidAnimateDetail = void
  export interface BalAccordionDidAnimate extends CustomEvent {
    detail: BalAccordionDidAnimateDetail
    target: HTMLBalAccordionElement
  }
}
