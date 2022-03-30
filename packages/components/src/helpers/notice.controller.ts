import { HTMLStencilElement } from '@stencil/core/internal'
import { Props } from '../props'

export interface BalNoticeOptions {
  message: string
  duration?: number
  color?: Props.BalNotificationColor | ''
  closeHandler?: () => void
}

export interface NoticeOptions {
  tag: string
}

export interface HTMLNoticeElement extends HTMLStencilElement {
  message: string
  color: string
  close: () => Promise<void>
}

export abstract class BalNoticeController {
  private container: HTMLElement | null = null
  private queue: HTMLNoticeElement[] = []
  private preQueue: HTMLNoticeElement[] = []
  private queueLimit = 5

  constructor(private options: NoticeOptions) {}

  create(options: BalNoticeOptions): any {
    this.setupContainer()
    const clone = this.findClone(options)
    if (clone === undefined) {
      const el: HTMLNoticeElement = document.createElement(this.options.tag) as unknown as HTMLNoticeElement
      Object.assign(el, options)
      el.addEventListener('balClose', event => {
        this.removeFromQueue((<any>event).detail)
      })
      this.preQueue.push(el)
      this.updateQueue()
      return el
    }
    return clone
  }

  setQueue(queueLimit: number) {
    this.queueLimit = queueLimit
  }

  async clearAll(): Promise<void> {
    const elements = this.container?.querySelectorAll(this.options.tag)
    if (elements) {
      const closingQueue = []
      for (let index = 0; index < elements.length; index++) {
        const el = elements[index] as unknown as HTMLNoticeElement
        if (el.close) {
          closingQueue.push(el.close())
        }
      }
      await Promise.all(closingQueue)
    }
  }

  private findClone(options: BalNoticeOptions): HTMLNoticeElement | undefined {
    for (let index = 0; index < this.queue.length; index++) {
      const el = this.queue[index]
      if (el.message === options.message && el.color === options.color) {
        return el
      }
    }
    return undefined
  }

  private setupContainer() {
    const containerId = `${this.options.tag}-container`
    this.container = document.getElementById(containerId)

    if (this.container) return

    if (!this.container) {
      this.container = document.createElement('bal-notices')
      this.container.setAttribute('interface', this.options.tag.replace('bal-', ''))
      // this.container.className = `bal-notices bal-notices--${this.options.tag.replace('bal-', '')}`
      this.container.id = containerId
    }

    document.body.appendChild(this.container)
  }

  private updateQueue() {
    if (this.queue.length < this.queueLimit) {
      const el = this.preQueue.shift()
      if (el && this.container) {
        this.queue.push(el)
        this.container.insertAdjacentElement('beforeend', el)
      }
    }
  }

  private removeFromQueue(toastId: string) {
    this.queue = this.queue.filter(el => el.id !== toastId)
    setTimeout(() => this.updateQueue(), 0)
  }
}
