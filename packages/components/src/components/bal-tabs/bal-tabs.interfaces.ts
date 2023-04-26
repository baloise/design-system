/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace BalProps {
  export type BalTabsContext = 'meta' | 'navigation' | 'navbar'
  export type BalTabsIconPosition = 'horizontal' | 'vertical'
  export type BalTabsVertical = boolean | 'mobile' | 'tablet'
  export type BalTabsFloat = 'left' | 'right'
  export type BalTabsColSize = 'one-quarter' | 'one-third' | 'half' | 'two-thirds' | 'three-quarters' | 'full'
}

namespace BalEvents {
  export interface BalTabsCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalTabsElement
  }

  export type BalTabsChangeDetail = string | undefined
  export type BalTabsChange = BalTabsCustomEvent<BalTabsChangeDetail>

  export type BalTabsWillAnimateDetail = void
  export type BalTabsWillAnimate = BalTabsCustomEvent<BalTabsWillAnimateDetail>

  export type BalTabsDidAnimateDetail = void
  export type BalTabsDidAnimate = BalTabsCustomEvent<BalTabsDidAnimateDetail>

  export interface BalTabItemCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalTabItemElement
  }

  export type BalTabItemNavigateDetail = MouseEvent
  export type BalTabItemNavigate = BalTabItemCustomEvent<BalTabItemNavigateDetail>
}
