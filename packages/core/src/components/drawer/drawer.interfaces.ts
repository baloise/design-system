export interface DrawerCustomEvent<T> extends CustomEvent<T> {
  detail: T
  target: HTMLDsDrawerElement
}

export const DRAWER_CONTAINERS = ['default', 'fluid', 'compact'] as const
export type DrawerContainer = (typeof DRAWER_CONTAINERS)[number]

export type DrawerPresentDetail = void
export type DrawerDismissDetail = void
