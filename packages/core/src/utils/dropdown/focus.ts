import { DropdownComponent } from './component'

export type DropdownFocus = {
  labelToFocus: string
}

export class DropdownFocusUtil {
  private component!: DropdownComponent

  private keyHitTimeout!: NodeJS.Timeout
  private timeout!: NodeJS.Timeout

  connectedCallback(component: DropdownComponent) {
    this.component = component
  }

  public focusOptionByLabel(key: string, options: Partial<{ select: boolean }> = {}) {
    this.component.labelToFocus = (this.component.labelToFocus + key).trim()
    if (this.component.labelToFocus.length > 0) {
      clearTimeout(this.keyHitTimeout)
      this.keyHitTimeout = setTimeout(() => {
        this.component.listEl?.focusByLabel(this.component.labelToFocus, options)
      }, 100)

      clearTimeout(this.timeout)
      this.timeout = setTimeout(async () => {
        this.component.labelToFocus = ''
      }, 1000)
    }
  }
}
