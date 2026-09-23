import { directChildren } from './dom'

/**
 * Watches the host's `slot="invalid-text"` light-DOM child for content, calling
 * `onChange` whenever "has non-empty content" flips. Covers both the node being
 * added/removed/replaced and its text being mutated in place (e.g. AEM writing a
 * validation message into an otherwise-empty node it owns).
 *
 * Returns a disconnect function to call from `disconnectedCallback`.
 */
export function watchInvalidTextSlot(el: HTMLElement, onChange: (hasContent: boolean) => void): () => void {
  let contentObserver: MutationObserver | undefined

  const check = () => {
    const slotted = directChildren<HTMLElement>(el, child => child.getAttribute('slot') === 'invalid-text')[0]
    onChange(!!slotted && (slotted.textContent ?? '').trim().length > 0)

    contentObserver?.disconnect()
    if (slotted && typeof MutationObserver !== 'undefined') {
      contentObserver = new MutationObserver(check)
      contentObserver.observe(slotted, { childList: true, characterData: true, subtree: true })
    }
  }

  // Node's SSR mock-doc (used by `@baloise/ds-core/hydrate`) has no MutationObserver — the initial
  // `check()` below still runs, the live-updating observer just isn't set up there.
  const hostObserver = typeof MutationObserver !== 'undefined' ? new MutationObserver(check) : undefined
  hostObserver?.observe(el, { childList: true })
  check()

  return () => {
    hostObserver?.disconnect()
    contentObserver?.disconnect()
  }
}
