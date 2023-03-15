/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace BalProps {
  export type BalNavbarInterface = 'app' | 'simple'
}

namespace BalEvents {
  export type BalNavbarBrandNavigationChangeDetail = MouseEvent
  export interface BalNavbarBrandNavigationChange extends CustomEvent {
    detail: BalNavbarBrandNavigationChangeDetail
    target: HTMLBalNavbarBrandElement
  }
}
