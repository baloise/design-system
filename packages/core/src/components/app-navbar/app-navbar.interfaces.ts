// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

export interface DsAppNavbarCustomEvent<T> extends CustomEvent<T> {
  detail: T
  target: HTMLElement
}

export type DsAppNavbarMenuOpenStart = DsAppNavbarCustomEvent<void>
export type DsAppNavbarMenuOpenEnd = DsAppNavbarCustomEvent<void>
export type DsAppNavbarMenuCloseStart = DsAppNavbarCustomEvent<void>
export type DsAppNavbarMenuCloseEnd = DsAppNavbarCustomEvent<void>

export const APP_NAVBAR_CONTAINERS = ['default', 'fluid', 'compact', ''] as const
export type AppNavbarContainer = (typeof APP_NAVBAR_CONTAINERS)[number]
