export interface BalToastOptions {
  message: string
  duration?: number
  type?: "primary" | "info" | "success" | "warning" | "danger"
}

export class BalToastController {
  private container: HTMLElement
  private queue: HTMLBalToastElement[] = []
  private preQueue: HTMLBalToastElement[] = []
  private queueLimit: number = 5

  create(options: BalToastOptions): HTMLBalToastElement {
    this.setupContainer()
    const toast: HTMLBalToastElement = document.createElement("bal-toast")
    toast.innerHTML = options.message
    toast.type = options.type || "success"
    toast.duration = options.duration || 0
    toast.addEventListener('balClose', event => this.removeFromQueue((<any>event).detail))
    this.preQueue.push(toast)
    this.updateQueue()
    return toast
  }

  private setupContainer()  {
    this.container = document.getElementById("bal-toast-container")

    if (this.container) return

    if (!this.container) {
      this.container = document.createElement("div")
      this.container.className = "bal-notices bal-notices--toast"
      this.container.id = "bal-toast-container"
    }

    document.body.appendChild(this.container)
  }

  private updateQueue() {
    if (this.queue.length < this.queueLimit) {
      const toast = this.preQueue.shift()
      if (toast) {
        this.queue.push(toast)
        this.container.insertAdjacentElement("beforeend", toast)
      }
    }
  }

  private removeFromQueue(toastId: string) {
    this.queue = this.queue.filter(el => el.id !== toastId)
    setTimeout(() => this.updateQueue(), 0)
  }

  setQueue(queueLimit: number) {
    this.queueLimit = queueLimit
  }

}

export const balToastController = new BalToastController()
