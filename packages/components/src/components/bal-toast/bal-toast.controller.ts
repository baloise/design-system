import { BalNoticeController, BalNoticeOptions } from '../../helpers/notice.controller'

export interface BalToastOptions extends BalNoticeOptions {}

export class BalToastController extends BalNoticeController {
  constructor() {
    super({
      tag: 'bal-toast',
    })
  }

  create(options: BalToastOptions): HTMLBalToastElement {
    return super.create(options)
  }
}

export const balToastController = new BalToastController()

// export interface BalToastOptions {
//   message: string
//   duration?: number
//   color?: 'primary' | 'info' | 'success' | 'warning' | 'danger'
//   onClose?: () => void
// }

// export class BalToastController {
//   private container: HTMLElement | null = null
//   private queue: HTMLBalToastElement[] = []
//   private preQueue: HTMLBalToastElement[] = []
//   private queueLimit: number = 5

//   create(options: BalToastOptions): HTMLBalToastElement {
//     this.setupContainer()
//     const cloneToast = this.findClone(options)
//     if (cloneToast === undefined) {
//       const toast: HTMLBalToastElement = document.createElement('bal-toast')
//       toast.innerHTML = options.message
//       toast.color = options.color || 'success'
//       toast.duration = options.duration || 0
//       toast.addEventListener('balClose', event => {
//         this.removeFromQueue((<any>event).detail)
//         if (options.onClose) {
//           options.onClose()
//         }
//       })
//       this.preQueue.push(toast)
//       this.updateQueue()
//       return toast
//     }
//     return cloneToast
//   }

//   private findClone(options: BalToastOptions): HTMLBalToastElement | undefined {
//     for (let index = 0; index < this.queue.length; index++) {
//       const toast = this.queue[index]
//       console.log(toast)
//       if (toast.textContent === options.message && toast.color === options.color) {
//         return toast
//       }
//     }
//     return undefined
//   }

//   private setupContainer() {
//     this.container = document.getElementById('bal-toast-container')

//     if (this.container) return

//     if (!this.container) {
//       this.container = document.createElement('div')
//       this.container.className = 'bal-notices bal-notices--toast'
//       this.container.id = 'bal-toast-container'
//     }

//     document.body.appendChild(this.container)
//   }

//   private updateQueue() {
//     if (this.queue.length < this.queueLimit) {
//       const toast = this.preQueue.shift()
//       if (toast && this.container) {
//         this.queue.push(toast)
//         this.container.insertAdjacentElement('beforeend', toast)
//       }
//     }
//   }

//   private removeFromQueue(toastId: string) {
//     this.queue = this.queue.filter(el => el.id !== toastId)
//     setTimeout(() => this.updateQueue(), 0)
//   }

//   setQueue(queueLimit: number) {
//     this.queueLimit = queueLimit
//   }

//   async clearAll(): Promise<void> {
//     const toasts = this.container?.querySelectorAll('bal-toast')
//     if (toasts) {
//       const closingQueue = []
//       for (let index = 0; index < toasts.length; index++) {
//         const toast = toasts[index]
//         closingQueue.push(toast.close())
//       }
//       await Promise.all(closingQueue)
//     }
//   }
// }

// export const balToastController = new BalToastController()
