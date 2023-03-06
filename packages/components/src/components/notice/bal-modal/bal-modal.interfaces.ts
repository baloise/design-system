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
