export type DsOrientationInfo = {
  portrait: boolean
  landscape: boolean
}

export interface DsOrientationObserver {
  orientationListener(info: DsOrientationInfo): void
}
