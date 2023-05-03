/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace BalProps {
  export type BalAccordionColor = 'primary' | 'info'
}

namespace BalEvents {
  export interface BalAccordionCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalAccordionElement
  }

  export type BalAccordionChangeDetail = boolean
  export type BalAccordionChange = BalAccordionCustomEvent<BalAccordionChangeDetail>

  export type BalAccordionWillAnimateDetail = boolean
  export type BalAccordionWillAnimate = BalAccordionCustomEvent<BalAccordionWillAnimateDetail>

  export type BalAccordionDidAnimateDetail = boolean
  export type BalAccordionDidAnimate = BalAccordionCustomEvent<BalAccordionDidAnimateDetail>
}
