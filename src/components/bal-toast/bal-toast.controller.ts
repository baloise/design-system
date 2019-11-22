import {noticesUtils} from "../../utils/notices.utils";

interface ToastOptions {
  message: string;
  type?: | "is-primary" | "is-info" | "is-success" | "is-warning" | "is-danger";
}

class BalToastController {
  create(options: ToastOptions): HTMLBalToastElement {
    const toast: HTMLBalToastElement = document.createElement("bal-toast");
    toast.message = options.message;
    toast.type = options.type || "is-primary";
    noticesUtils.showNotice(toast);
    return toast;
  }
}

export const balToastController = new BalToastController();
