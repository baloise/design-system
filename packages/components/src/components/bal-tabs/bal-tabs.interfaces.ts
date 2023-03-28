/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace BalProps {
  export type BalTabsInterface = 'tabs' | 'tabs-sub' | 'steps' | 'o-steps' | 'navbar' | 'meta' | 'navigation'
  export type BalTabsIconPosition = 'horizontal' | 'vertical'
  export type BalTabsVertical = boolean | 'mobile' | 'tablet'
  export type BalTabsFloat = 'left' | 'right'
  export type BalTabsColSize = 'one-quarter' | 'one-third' | 'half' | 'two-thirds' | 'three-quarters' | 'full'
}

namespace BalEvents {
  export type BalTabsChangeDetail = string | undefined
  export interface BalTabsChange extends CustomEvent {
    detail: BalTabsChangeDetail
    target: HTMLBalPopoverElement
  }

  export type BalTabsWillAnimateDetail = void
  export interface BalTabsWillAnimate extends CustomEvent {
    detail: BalTabsWillAnimateDetail
    target: HTMLBalPopoverElement
  }

  export type BalTabsDidAnimateDetail = void
  export interface BalTabsDidAnimate extends CustomEvent {
    detail: BalTabsDidAnimateDetail
    target: HTMLBalPopoverElement
  }
}
