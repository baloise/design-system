import { DsConfigObserver } from './observer'

export interface Subject {
  attach(observer: DsConfigObserver): void
  detach(observer: DsConfigObserver): void
  notify(): void
}
