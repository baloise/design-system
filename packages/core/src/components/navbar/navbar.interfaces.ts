// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

export interface DsNavbarCustomEvent<T> extends CustomEvent<T> {
  detail: T
  target: HTMLElement
}

export type DsNavbarMenuOpenStart = DsNavbarCustomEvent<void>
export type DsNavbarMenuOpenEnd = DsNavbarCustomEvent<void>
export type DsNavbarMenuCloseStart = DsNavbarCustomEvent<void>
export type DsNavbarMenuCloseEnd = DsNavbarCustomEvent<void>
