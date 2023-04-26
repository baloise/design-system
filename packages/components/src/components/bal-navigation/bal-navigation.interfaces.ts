/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace BalProps {
  export type BalNavigationLevelBlockColor = 'white' | 'grey' | 'yellow' | 'red' | 'purple' | 'green'
}

namespace BalEvents {
  export interface BalNavigationLevelBlockCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalNavigationLevelBlockElement
  }

  export type BalNavigationLevelBlockClickDetail = MouseEvent
  export type BalNavigationLevelBlockClick = BalNavigationLevelBlockCustomEvent<BalNavigationLevelBlockClickDetail>

  export interface BalNavigationLevelBlockItemCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalNavigationLevelBlockItemElement
  }

  export type BalNavigationLevelBlockItemClickDetail = MouseEvent
  export type BalNavigationLevelBlockItemClick =
    BalNavigationLevelBlockItemCustomEvent<BalNavigationLevelBlockItemClickDetail>

  export interface BalNavigationLevelMainCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalNavigationLevelMainElement
  }

  export type BalNavigationLevelMainClickDetail = MouseEvent
  export type BalNavigationLevelMainClick = BalNavigationLevelMainCustomEvent<BalNavigationLevelMainClickDetail>

  export interface BalNavigationLevelMetaCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLBalNavigationLevelMetaElement
  }

  export type BalNavigationLevelMetaClickDetail = MouseEvent
  export type BalNavigationLevelMetaClick = BalNavigationLevelMetaCustomEvent<BalNavigationLevelMetaClickDetail>
}
