export interface HintCustomEvent<T> extends CustomEvent<T> {
  detail: T
  target: HTMLDsHintElement
}
