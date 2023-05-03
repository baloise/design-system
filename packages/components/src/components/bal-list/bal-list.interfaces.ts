/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace BalProps {
  export type BalListItemAccordionHeadIcon = 'plus' | 'nav-go-down'
  export type BalListItemTarget = BalButtonTarget
  export type BalListSize = 'small' | 'large' | ''
  export type BalListBackground = 'light' | 'color' | 'dark'
  export type BalListContentAlignment = 'start' | 'center' | 'end' | 'space-between'
  export type BalListContentSpacing = 'none' | 'normal'
}

namespace BalEvents {
  export interface BalListItemCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalListItemElement
  }

  export type BalListItemNavigateDetail = MouseEvent
  export type BalListItemNavigate = BalListItemCustomEvent<BalListItemNavigateDetail>

  export type BalListItemGroupStateChangedDetail = MouseEvent
  export type BalListItemGroupStateChanged = BalListItemCustomEvent<BalListItemGroupStateChangedDetail>

  export type BalListItemWillAnimateDetail = boolean
  export type BalListItemWillAnimate = BalListItemCustomEvent<BalListItemWillAnimateDetail>

  export type BalListItemDidAnimateDetail = boolean
  export type BalListItemDidAnimate = BalListItemCustomEvent<BalListItemDidAnimateDetail>

  export interface BalListItemAccordionHeadCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalListItemAccordionHeadElement
  }

  export type BalListAccordionChangeDetail = boolean
  export type BalListAccordionChange = BalListItemAccordionHeadCustomEvent<BalListAccordionChangeDetail>
}
