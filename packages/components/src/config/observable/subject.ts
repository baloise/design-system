import { BalConfigObserver } from './observer'

export interface Subject {
  attach(observer: BalConfigObserver): void
  detach(observer: BalConfigObserver): void
  notify(): void
}
