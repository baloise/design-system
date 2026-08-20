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
    const slotted = el.querySelector<HTMLElement>(':scope > [slot="invalid-text"]')
    onChange(!!slotted && (slotted.textContent ?? '').trim().length > 0)

    contentObserver?.disconnect()
    if (slotted) {
      contentObserver = new MutationObserver(check)
      contentObserver.observe(slotted, { childList: true, characterData: true, subtree: true })
    }
  }

  const hostObserver = new MutationObserver(check)
  hostObserver.observe(el, { childList: true })
  check()

  return () => {
    hostObserver.disconnect()
    contentObserver?.disconnect()
  }
}
