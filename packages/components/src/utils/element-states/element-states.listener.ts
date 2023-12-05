import { balBrowser } from '../browser'
import { addEventListener, removeEventListener } from '../helpers'
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

    addEventListener(this.el, 'mouseenter', this.onMouseEnter, BalElementStateListener.EventListenerOptions)
    addEventListener(this.el, 'mouseleave', this.onMouseLeave, BalElementStateListener.EventListenerOptions)
    addEventListener(this.el, 'pointerdown', this.onPointerDown, BalElementStateListener.EventListenerOptions)

    if (balBrowser.hasDocument) {
      addEventListener(document, 'pointerup', this.onPointerUp, BalElementStateListener.EventListenerOptions)
    }
  }

  disconnect(): void {
    super.disconnect()
    if (this.el) {
      removeEventListener(this.el, 'mouseenter', this.onMouseEnter)
      removeEventListener(this.el, 'mouseleave', this.onMouseLeave)
      removeEventListener(this.el, 'pointerdown', this.onPointerDown)

      if (balBrowser.hasDocument) {
        removeEventListener(document, 'pointerup', this.onPointerUp)
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
