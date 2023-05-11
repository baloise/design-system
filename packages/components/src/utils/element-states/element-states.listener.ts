import { balBrowser } from '../browser'
import { ListenerAbstract } from '../types/listener'
import { BalElementStateInfo } from './element-states.interfaces'

export class BalElementStateListener<TObserver> extends ListenerAbstract<TObserver, BalElementStateInfo> {
  static EventListenerOptions: AddEventListenerOptions = {
    passive: true,
  }

  static DefaultState: BalElementStateInfo = {
    hovered: false,
    pressed: false,
  }

  private state: BalElementStateInfo = BalElementStateListener.DefaultState

  connect(el: HTMLElement): void {
    super.connect(el)

    el.addEventListener('mouseenter', this.onMouseEnter, BalElementStateListener.EventListenerOptions)
    el.addEventListener('mouseleave', this.onMouseLeave, BalElementStateListener.EventListenerOptions)
    el.addEventListener('pointerdown', this.onPointerDown, BalElementStateListener.EventListenerOptions)

    if (balBrowser.hasDocument) {
      document.addEventListener('pointerup', this.onPointerUp, BalElementStateListener.EventListenerOptions)
    }
  }

  disconnect(): void {
    super.disconnect()
    if (this.el) {
      this.el.removeEventListener('mouseenter', this.onMouseEnter)
      this.el.removeEventListener('mouseleave', this.onMouseLeave)
      this.el.removeEventListener('pointerdown', this.onPointerDown)

      if (balBrowser.hasDocument) {
        document.removeEventListener('pointerup', this.onPointerUp)
      }
    }
  }

  private updateState(newState: Partial<BalElementStateInfo>) {
    this.state = { ...this.state, ...newState }
    this.notify(this.state)
  }

  private onMouseEnter = () => {
    this.updateState({ hovered: true })
  }

  private onMouseLeave = () => {
    this.updateState({ hovered: false })
  }

  private onPointerDown = () => {
    this.updateState({ pressed: true })
  }

  private onPointerUp = () => {
    this.updateState({ pressed: false })
  }
}
