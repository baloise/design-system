import { getAppRoot } from '../../utils/helpers'
import { Notification } from './bal-notification-container'

export type { Notification } from './bal-notification-container'

export interface NotificationController {
  create(options: Notification): Promise<string | undefined>
  dismissAll(): Promise<void>
}

class NotificationControllerImpl implements NotificationController {
  private container: HTMLBalNotificationContainerElement | null = null

  constructor(private type: 'toast' | 'snackbar') {}

  async create(options: Notification): Promise<string | undefined> {
    this.setupContainer(options)

    const id = await this.container?.addNotification(options)
    return id
  }

  dismissAll(): Promise<void> {
    this.container?.removeAll()
    return Promise.resolve()
  }

  private setupContainer(options: Notification) {
    console.debug('Setting up notice container', this.type, options)

    // Check if there is already a container for the given type, if so reuse it
    const containerId = `bal-${this.type}-container`
    this.container = document.getElementById(containerId) as HTMLBalNotificationContainerElement

    if (this.container) return

    // If not, create a new one and append it to the app root
    if (!this.container) {
      this.container = document.createElement('bal-notification-container') as HTMLBalNotificationContainerElement
      this.container.id = containerId
      this.container.setAttribute('type', this.type)

      const root = getAppRoot(document)
      root.appendChild(this.container)
    }
  }
}

const createNotificationController = (type: 'toast' | 'snackbar'): NotificationController => {
  return new NotificationControllerImpl(type)
}

export const balToastController = createNotificationController('toast')
export const balSnackbarController = createNotificationController('snackbar')
