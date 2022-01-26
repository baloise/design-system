import { ConfigObserver } from './observer'

export interface Subject {
  attach(observer: ConfigObserver): void
  detach(observer: ConfigObserver): void
  notify(): void
}
