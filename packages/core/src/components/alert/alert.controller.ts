import { getAppRoot } from '../../utils/helpers'
import { Alert, AlertType } from './alert-container.interfaces'

export type { Alert } from './alert-container.interfaces'

export interface AlertController {
  create(options: Alert): Promise<string | undefined>
  remove(id: string): Promise<void>
  removeAll(): Promise<void>
}

class AlertControllerImpl implements AlertController {
  private container: HTMLDsAlertContainerElement | null = null

  constructor(private type: AlertType) {}

  async create(options: Alert): Promise<string | undefined> {
    this.setupContainer(options)
    return this.container?.addAlert(options)
  }

  async remove(id: string): Promise<void> {
    await this.container?.removeAlert(id)
  }

  async removeAll(): Promise<void> {
    await this.container?.removeAll()
  }

  private setupContainer(options: Alert) {
    // Check if there is already a container for the given type, if so reuse it
    const containerId = `bal-${this.type}-container`
    this.container = document.getElementById(containerId) as HTMLDsAlertContainerElement

    if (this.container) return

    // If not, create a new one and append it to the app root
    if (!this.container) {
      this.container = document.createElement('bal-alert-container') as HTMLDsAlertContainerElement
      this.container.id = containerId
      this.container.setAttribute('type', this.type)

      const root = getAppRoot(document)
      root.appendChild(this.container)
    }
  }
}

const createAlertController = (type: AlertType): AlertController => {
  return new AlertControllerImpl(type)
}

export const dsToastController = createAlertController('toast')
export const dsSnackbarController = createAlertController('snackbar')
