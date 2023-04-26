/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace BalProps {
  export type BalNavbarInterface = 'app' | 'simple'
}

namespace BalEvents {
  export interface BalNavbarBrandCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalNavbarBrandElement
  }

  export type BalNavbarBrandNavigationChangeDetail = MouseEvent
  export type BalNavbarBrandNavigationChange = BalNavbarBrandCustomEvent<BalNavbarBrandNavigationChangeDetail>

  export type BalNavbarMenuWillAnimateDetail = void
  export type BalNavbarMenuWillAnimate = BalNavbarBrandCustomEvent<BalNavbarMenuWillAnimateDetail>

  export type BalNavbarMenuDidAnimateDetail = void
  export type BalNavbarMenuDidAnimate = BalNavbarBrandCustomEvent<BalNavbarMenuDidAnimateDetail>
}
