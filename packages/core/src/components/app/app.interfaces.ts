export interface AppCustomEvent<T> extends CustomEvent<T> {
  detail: T
  target: HTMLDsAppElement
}
