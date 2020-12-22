import { noticesUtils } from "../../utils/notices.utils"

interface ToastOptions {
  message: string
  duration?: number
  type?: "is-primary" | "is-info" | "is-success" | "is-warning" | "is-danger"
}

class ToastController {
  create(options: ToastOptions): HTMLBalToastElement {
    const toast: HTMLBalToastElement = document.createElement("bal-toast")
    toast.innerHTML = options.message
    toast.type = options.type || "is-success"
    noticesUtils.showNotice(toast, options.duration)
    return toast
  }
}

export const balToastController = new ToastController()
