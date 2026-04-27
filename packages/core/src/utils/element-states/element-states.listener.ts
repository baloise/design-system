import { HTMLStencilElement } from '@stencil/core/internal'
import { dsBrowser } from '../browser'
import { addEventListener, removeEventListener } from '../helpers'
import { ListenerAbstract } from '../types/listener'
import { ElementStateInfo } from './element-states.interfaces'

export class ElementStateListener<TObserver> extends ListenerAbstract<TObserver, ElementStateInfo> {
  static EventListenerOptions: AddEventListenerOptions = {
    passive: true,
  }

  static DefaultState: ElementStateInfo = {
    hovered: false,
    pressed: false,
  }

  private state: ElementStateInfo = ElementStateListener.DefaultState

  override connect(el: HTMLElement | HTMLStencilElement): void {
    super.connect(el)

    addEventListener(this.el, 'mouseenter', this.onMouseEnter, ElementStateListener.EventListenerOptions)
    addEventListener(this.el, 'mouseleave', this.onMouseLeave, ElementStateListener.EventListenerOptions)
    addEventListener(this.el, 'pointerdown', this.onPointerDown, ElementStateListener.EventListenerOptions)

    if (dsBrowser.hasDocument) {
      addEventListener(document, 'pointerup', this.onPointerUp, ElementStateListener.EventListenerOptions)
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

  private updateState(newState: Partial<ElementStateInfo>) {
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
