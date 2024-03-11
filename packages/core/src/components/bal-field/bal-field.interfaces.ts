/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace BalProps {
  export type BalFieldLabelWeight = 'bold' | 'regular'
  export type BalFieldLabelSize = '' | 'small' | 'large' | 'x-large' | 'xx-large' | 'xxx-large'
  export type BalFieldMessageColor = '' | 'success' | 'warning' | 'danger'
}

namespace BalEvents {
  export interface BalFieldCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalFieldElement
  }

  export type BalFieldAriaLabelledByDetail = HTMLElement
  export type BalFieldAriaLabelledBy = BalFieldCustomEvent<BalFieldAriaLabelledByDetail>
}
