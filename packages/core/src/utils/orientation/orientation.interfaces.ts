export type DsOrientationInfo = {
  portrait: boolean
  landscape: boolean
}

export interface DsOrientationObserver {
  listenToOrientation(info: DsOrientationInfo): void
}
