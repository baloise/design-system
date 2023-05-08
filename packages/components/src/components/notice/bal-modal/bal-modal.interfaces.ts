/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../interfaces.d.ts" />

namespace BalProps {
  export type BalModalInterface = 'light' | 'card'
  export type BalModalSpace = 'small' | '' | 'medium'

  export type ComponentProps = { [key: string]: any }
  // eslint-disable-next-line
  export type ComponentRef = Function | HTMLElement | string | null
  export interface FrameworkDelegate {
    attachViewToDom(container: any, component: any, propsOrDataObj?: any, cssClasses?: string[]): Promise<HTMLElement>
    removeViewFromDom(container: any, component: any): Promise<void>
  }
}
namespace BalEvents {
  export interface OverlayEventDetail<T = any> {
    data?: T
    role?: string
  }

  export interface BalModalCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalModalElement
  }

  export type BalModalDidPresentDetail = void
  export type BalModalDidPresent = BalModalCustomEvent<BalModalDidPresentDetail>

  export type BalModalWillPresentDetail = void
  export type BalModalWillPresent = BalModalCustomEvent<BalModalWillPresentDetail>

  export type BalModalDidDismissDetail = any
  export type BalModalDidDismiss = BalModalCustomEvent<BalModalDidDismissDetail>

  export type BalModalWillDismissDetail = any
  export type BalModalWillDismiss = BalModalCustomEvent<BalModalWillDismissDetail>
}
