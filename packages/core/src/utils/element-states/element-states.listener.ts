import { HTMLStencilElement } from '@stencil/core/internal'
import { dsBrowser } from '../browser'
import { addEventListener, removeEventListener } from '../helpers'
import { ListenerAbstract } from '../types/listener'
import { ElementStateInfo } from './element-states.interfaces'

export class ElementStateListener<TObserver> extends ListenerAbstract<TObserver, BalElementStateInfo> {
  static EventListenerOptions: AddEventListenerOptions = {
    passive: true,
  }

  static DefaultState: BalElementStateInfo = {
    hovered: false,
    pressed: false,
  }

  private state: BalElementStateInfo = BalElementStateListener.DefaultState

  override connect(el: HTMLElement | HTMLStencilElement): void {
    super.connect(el)

    addEventListener(this.el, 'mouseenter', this.onMouseEnter, BalElementStateListener.EventListenerOptions)
    addEventListener(this.el, 'mouseleave', this.onMouseLeave, BalElementStateListener.EventListenerOptions)
    addEventListener(this.el, 'pointerdown', this.onPointerDown, BalElementStateListener.EventListenerOptions)

    if (dsBrowser.hasDocument) {
      addEventListener(document, 'pointerup', this.onPointerUp, BalElementStateListener.EventListenerOptions)
    }
  }

  override disconnect(): void {
    super.disconnect()
    if (this.el) {
      removeEventListener(this.el, 'mouseenter', this.onMouseEnter)
      removeEventListener(this.el, 'mouseleave', this.onMouseLeave)
      removeEventListener(this.el, 'pointerdown', this.onPointerDown)

      if (dsBrowser.hasDocument) {
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
