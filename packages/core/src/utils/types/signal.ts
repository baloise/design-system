export abstract class Subject<TObserver, TData = undefined> {
  observers: TObserver[] = []

  constructor(private notifyCallback?: (observer: TObserver, data?: TData) => void) {}

  attach(observer: TObserver): void {
    const isExist = this.observers.includes(observer)
    if (isExist) {
      return console.log('Subject: Observer has been attached already.')
    }

    this.observers.push(observer)
  }

  detach(observer: TObserver): void {
    const observerIndex = this.observers.indexOf(observer)
    if (observerIndex === -1) {
      return console.log('Subject: Nonexistent observer.')
    }

    this.observers.splice(observerIndex, 1)
  }

  notify(data?: TData): void {
    for (const observer of this.observers) {
      if (typeof observer === 'function') {
        observer(data)
      } else {
        if (this.notifyCallback) {
          this.notifyCallback(observer, data)
        }
      }
    }
  }
}

export abstract class SingleSubject<TObserver, TData = undefined> {
  observer?: TObserver

  constructor(private notifyCallback?: (observer: TObserver, data?: TData) => void) {}

  attach(observer: TObserver): void {
    this.observer = observer
  }

  detach(): void {
    this.observer = undefined
  }

  notify(data?: TData): void {
    if (this.observer) {
      if (typeof this.observer === 'function') {
        this.observer(data)
      } else {
        if (this.notifyCallback) {
          this.notifyCallback(this.observer, data)
        }
      }
    }
  }
}
