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

  export type BalNavbarMenuWillAnimateDetail = void
  export interface BalNavbarMenuWillAnimate extends CustomEvent {
    detail: BalNavbarMenuWillAnimateDetail
    target: HTMLBalNavbarBrandElement
  }

  export type BalNavbarMenuDidAnimateDetail = void
  export interface BalNavbarMenuDidAnimate extends CustomEvent {
    detail: BalNavbarMenuDidAnimateDetail
    target: HTMLBalNavbarBrandElement
  }
}
