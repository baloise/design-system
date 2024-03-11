export type BalOrientationInfo = {
  portrait: boolean
  landscape: boolean
}

export interface BalOrientationObserver {
  orientationListener(info: BalOrientationInfo): void
}
