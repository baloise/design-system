import { autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom'
import { Component, Element, Event, EventEmitter, h, Host, Listen, Method, Prop, State, Watch } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { DsComponentInterface, DsConfigObserver, DsConfigState, ListenToConfig } from '@global'
import {
  Logger,
  type LogInstance,
  ValidateEmptyOrOneOf,
  ValidateEmptyOrType,
  dsBrowser,
  isEscapeKey,
  isTabKey,
  setupValidation,
  wait,
} from '@utils'
import {
  POPUP_PLACEMENTS,
  POPUP_ROLES,
  type PopupPlacement,
  type PopupRole,
  type PopupPresentDetail,
  type PopupDismissDetail,
} from './popup.interfaces'

const FOCUSABLE_QUERY = [
  'button:not([disabled]):not([tabindex^="-"])',
  'input:not([type=hidden]):not([disabled]):not([tabindex^="-"])',
  'select:not([disabled]):not([tabindex^="-"])',
  'textarea:not([disabled]):not([tabindex^="-"])',
  'a[href]:not([tabindex^="-"])',
  '[tabindex]:not([tabindex^="-"])',
].join(', ')

// ─── Group registry ───────────────────────────────────────────────────────────
// Module-level map so same-group popups can dismiss each other.
const popupGroups = new Map<string, Set<HTMLDsPopupElement>>()

/**
 * Popup displays anchored overlay content positioned relative to a trigger element.
 * Serves as a primitive for dropdowns, hints, menus, datepickers, and autocompletes.
 *
 * Trigger wiring:
 *   Programmatic — set the `trigger` property to an HTMLElement; call `present()` / `dismiss()`.
 *   Declarative  — add `data-popup="<id>"` to any trigger element and set matching `id` on popup.
 *
 * @slot - The popup content.
 * @part panel    - The floating panel container.
 * @part backdrop - The optional full-screen backdrop overlay.
 * @part close    - The optional close button (visible when closable).
 */
@Component({
  tag: 'ds-popup',
  styleUrl: 'popup.host.scss',
  shadow: true,
})
export class Popup implements DsComponentInterface, DsConfigObserver {
  private cleanupPositioner?: () => void
  private currentTrigger: HTMLElement | undefined = undefined
  private transitionQueue: Promise<void> = Promise.resolve()

  log!: LogInstance

  @Logger('popup')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  @State() animated = true
  @State() isOpen = false

  panelEl: HTMLDivElement | undefined

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * If `true` the popup is open.
   */
  @Prop({ reflect: true, mutable: true })
  @ValidateEmptyOrType('boolean')
  open: boolean = false

  @Watch('open')
  openChanged(newValue: boolean) {
    newValue ? this.runPresent() : this.runDismiss()
  }

  /**
   * The trigger element. Setting this wires up aria-haspopup and aria-expanded automatically.
   */
  @Prop()
  readonly trigger: HTMLElement | undefined = undefined

  @Watch('trigger')
  triggerChanged(newTrigger: HTMLElement | undefined, oldTrigger: HTMLElement | undefined) {
    if (oldTrigger) {
      oldTrigger.removeAttribute('aria-haspopup')
      oldTrigger.removeAttribute('aria-expanded')
    }
    if (newTrigger) {
      newTrigger.setAttribute('aria-haspopup', this.role)
      newTrigger.setAttribute('aria-expanded', 'false')
    }
  }

  /**
   * Preferred placement of the popup relative to the trigger.
   */
  @Prop()
  @ValidateEmptyOrOneOf(...POPUP_PLACEMENTS)
  readonly placement: PopupPlacement = 'bottom'

  /**
   * Offset in pixels between the trigger element and the popup panel.
   */
  @Prop()
  @ValidateEmptyOrType('number')
  readonly offset: number = 8

  /**
   * ARIA role applied to the panel.
   * Controls focus-trap behaviour and the aria-haspopup value set on the trigger.
   * Use "dialog" for rich content, "listbox" or "menu" for interactive option lists.
   */
  @Prop()
  @ValidateEmptyOrOneOf(...POPUP_ROLES)
  readonly role: PopupRole = 'dialog'

  /**
   * If `true`, the popup can be dismissed via the Escape key and shows a close button.
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly closable: boolean = false

  /**
   * If `true`, clicking outside the popup panel dismisses it.
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly backdropDismiss: boolean = false

  /**
   * If `true`, a full-screen backdrop overlay is rendered behind the popup panel.
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly backdrop: boolean = false

  /**
   * Group name for mutual-exclusion. Only one popup within the same group is open at a time.
   */
  @Prop()
  readonly group: string | undefined = undefined

  /**
   * Accessible label for the popup panel (sets aria-label on the panel element).
   */
  @Prop()
  readonly label: string = ''

  /**
   * Override the automatic focus-trap behaviour.
   * When undefined, trapping is enabled for role="dialog" and disabled for all other roles.
   */
  @Prop()
  readonly trapFocus: boolean | undefined = undefined

  /**
   * EVENTS
   * ------------------------------------------------------
   */

  /** Emitted before the popup opens. */
  @Event() dsWillPresent!: EventEmitter<PopupPresentDetail>

  /** Emitted after the popup is fully open. */
  @Event() dsDidPresent!: EventEmitter<PopupPresentDetail>

  /** Emitted before the popup closes. */
  @Event() dsWillDismiss!: EventEmitter<PopupDismissDetail>

  /** Emitted after the popup is fully closed. */
  @Event() dsDidDismiss!: EventEmitter<PopupDismissDetail>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback(): void {
    setupValidation(this)
    this.registerGroup()
  }

  componentDidLoad(): void {
    if (this.trigger) {
      this.trigger.setAttribute('aria-haspopup', this.role)
      this.trigger.setAttribute('aria-expanded', 'false')
    }
    if (this.open) {
      this.runPresent()
    }
  }

  componentWillUpdate(): void {
    setupValidation(this)
  }

  disconnectedCallback(): void {
    this.cleanupPositioner?.()
    if (this.trigger) {
      this.trigger.removeAttribute('aria-haspopup')
      this.trigger.removeAttribute('aria-expanded')
    }
    this.unregisterGroup()
  }

  /**
   * PUBLIC METHODS
   * ------------------------------------------------------
   */

  /** Opens the popup. */
  @Method()
  async present(): Promise<void> {
    this.open = true
  }

  /** Closes the popup. */
  @Method()
  async dismiss(): Promise<void> {
    this.open = false
  }

  /** Toggles the popup open or closed. */
  @Method()
  async toggle(): Promise<void> {
    this.open ? this.dismiss() : this.present()
  }

  /**
   * @internal
   */
  @Method()
  @ListenToConfig()
  async configChanged(state: DsConfigState): Promise<void> {
    this.animated = state.animated
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  @Listen('click', { target: 'document' })
  async listenToClick(ev: MouseEvent): Promise<void> {
    // Declarative trigger: element with data-popup matching this element's id.
    if (this.el.id) {
      const closest = (ev.target as HTMLElement).closest(`[data-popup="${this.el.id}"]`) as HTMLElement | null
      if (closest) {
        this.currentTrigger = closest
        await this.toggle()
        return
      }
    }

    // Click-outside dismiss using composedPath so shadow DOM clicks are detected.
    if (this.backdropDismiss && this.isOpen) {
      const path = ev.composedPath() as EventTarget[]
      const insidePanel = path.includes(this.panelEl as EventTarget)
      const effectiveTrigger = this.currentTrigger ?? this.trigger
      const insideTrigger = effectiveTrigger ? path.includes(effectiveTrigger) : false
      if (!insidePanel && !insideTrigger) {
        await this.dismiss()
      }
    }
  }

  @Listen('keydown', { target: 'document' })
  listenToKeyDown(ev: KeyboardEvent): void {
    if (!this.isOpen) return

    if (this.closable && isEscapeKey(ev)) {
      ev.stopPropagation()
      this.dismiss()
      return
    }

    if (isTabKey(ev) && this.shouldTrapFocus) {
      this.handleFocusTrap(ev)
    }
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private get shouldTrapFocus(): boolean {
    if (this.trapFocus !== undefined) return this.trapFocus
    return this.role === 'dialog'
  }

  private runPresent(): void {
    this.transitionQueue = this.transitionQueue.then(() => this.doPresent()).catch(() => undefined)
  }

  private runDismiss(): void {
    this.transitionQueue = this.transitionQueue.then(() => this.doDismiss()).catch(() => undefined)
  }

  private async doPresent(): Promise<void> {
    if (this.isOpen) return
    const trigger = this.currentTrigger ?? this.trigger

    await this.dismissGroupSiblings()
    this.dsWillPresent.emit({ trigger })

    if (trigger) {
      trigger.setAttribute('aria-expanded', 'true')
      // Compute initial position while panel is still invisible so there is no flash.
      await this.updatePosition(trigger)
      this.startPositioner(trigger)
    }

    this.isOpen = true

    if (this.animated) await wait(300)

    this.focusPanel()
    this.dsDidPresent.emit({ trigger })
  }

  private async doDismiss(): Promise<void> {
    if (!this.isOpen) return
    const trigger = this.currentTrigger ?? this.trigger

    this.dsWillDismiss.emit({ trigger })

    this.cleanupPositioner?.()
    this.cleanupPositioner = undefined

    if (trigger) {
      trigger.setAttribute('aria-expanded', 'false')
    }

    this.isOpen = false

    if (this.animated) await wait(300)

    trigger?.focus()
    this.dsDidDismiss.emit({ trigger })
  }

  private startPositioner(trigger: HTMLElement): void {
    if (!this.panelEl) return
    this.cleanupPositioner = autoUpdate(trigger, this.panelEl, () => this.updatePosition(trigger), {
      ancestorScroll: true,
      ancestorResize: true,
      elementResize: true,
      layoutShift: true,
      animationFrame: false,
    })
  }

  private async updatePosition(trigger: HTMLElement): Promise<void> {
    if (!this.panelEl) return
    const { x, y, placement } = await computePosition(trigger, this.panelEl, {
      placement: this.placement,
      strategy: 'fixed',
      middleware: [
        dsBrowser.hasWindow && !window.frameElement ? shift() : undefined,
        flip(),
        offset(this.offset),
      ].filter(Boolean) as NonNullable<Parameters<typeof computePosition>[2]>['middleware'],
    })
    Object.assign(this.panelEl.style, { left: `${x}px`, top: `${y}px` })
    this.panelEl.dataset['placement'] = placement.split('-')[0]
  }

  private focusPanel(): void {
    if (!this.panelEl) return
    const focusable = this.getFocusableElements()
    if (focusable.length > 0) {
      focusable[0].focus({ preventScroll: true })
    } else {
      this.panelEl.focus({ preventScroll: true })
    }
  }

  private handleFocusTrap(ev: KeyboardEvent): void {
    const focusable = this.getFocusableElements()
    if (focusable.length === 0) return

    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    const active = this.getDeepActiveElement()

    if (ev.shiftKey) {
      if (active === first || active === this.panelEl) {
        ev.preventDefault()
        last.focus()
      }
    } else {
      if (active === last) {
        ev.preventDefault()
        first.focus()
      }
    }
  }

  /** Walks shadow roots to find the truly focused element. */
  private getDeepActiveElement(): Element | null {
    let el: Element | null = document.activeElement
    while (el?.shadowRoot?.activeElement) {
      el = el.shadowRoot.activeElement
    }
    return el
  }

  private getFocusableElements(): HTMLElement[] {
    if (!this.panelEl) return []
    return Array.from(this.panelEl.querySelectorAll<HTMLElement>(FOCUSABLE_QUERY))
  }

  private registerGroup(): void {
    if (!this.group) return
    if (!popupGroups.has(this.group)) popupGroups.set(this.group, new Set())
    popupGroups.get(this.group)!.add(this.el as unknown as HTMLDsPopupElement)
  }

  private unregisterGroup(): void {
    if (!this.group) return
    popupGroups.get(this.group)?.delete(this.el as unknown as HTMLDsPopupElement)
  }

  private async dismissGroupSiblings(): Promise<void> {
    if (!this.group) return
    const siblings = popupGroups.get(this.group)
    if (!siblings) return
    for (const sibling of siblings) {
      if (sibling !== (this.el as unknown as HTMLDsPopupElement)) {
        await sibling.dismiss()
      }
    }
  }

  /**
   * EVENT BINDING
   * ------------------------------------------------------
   */

  private handleCloseClick = (): void => {
    this.dismiss()
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    return (
      <Host class={{ 'is-open': this.isOpen, 'is-animated': this.animated }}>
        {this.backdrop && <div part="backdrop" />}
        <div
          part="panel"
          ref={el => (this.panelEl = el)}
          role={this.role}
          aria-modal={this.role === 'dialog' ? 'true' : undefined}
          aria-label={this.label || undefined}
          tabindex="-1"
          data-testid="ds-popup-panel"
        >
          {this.closable && <ds-close part="close" onClick={this.handleCloseClick} />}
          <slot />
        </div>
      </Host>
    )
  }
}
