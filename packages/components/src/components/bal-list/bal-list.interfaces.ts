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
  export type BalListAccordionChangeDetail = boolean
  export interface BalListAccordionChange extends CustomEvent {
    detail: BalListAccordionChangeDetail
    target: HTMLBalListItemAccordionHeadElement
  }

  export type BalListItemNavigateDetail = MouseEvent
  export interface BalListItemNavigate extends CustomEvent {
    detail: BalListItemNavigateDetail
    target: HTMLBalListItemElement
  }

  export type BalListItemGroupStateChangedDetail = MouseEvent
  export interface BalListItemGroupStateChanged extends CustomEvent {
    detail: BalListItemGroupStateChangedDetail
    target: HTMLBalListItemElement
  }

  export type BalListItemWillAnimateDetail = void
  export interface BalListItemWillAnimate extends CustomEvent {
    detail: BalListItemWillAnimateDetail
    target: HTMLBalListItemElement
  }

  export type BalListItemDidAnimateDetail = void
  export interface BalListItemDidAnimate extends CustomEvent {
    detail: BalListItemDidAnimateDetail
    target: HTMLBalListItemElement
  }
}
