export interface MutationObserverOptions extends MutationObserverInit {
  el: HTMLElement
  parentTag: string
  childTag: string
}

export const observeMutations = <T extends HTMLElement>(
  options: MutationObserverOptions,
  onChange: (el: T | undefined) => void,
) => {
  /* tslint:disable-next-line */
  if (typeof MutationObserver === 'undefined') {
    return
  }

  const mutation = new MutationObserver(mutationList => {
    mutationList = mutationList.filter(
      record =>
        record.target.nodeName === options.parentTag.toUpperCase() ||
        record.target.nodeName === options.childTag.toUpperCase(),
    )
    if (mutationList.length > 0) {
      onChange(undefined)
    }
  })
  mutation.observe(options.el, {
    childList: options.childList || true,
    subtree: options.subtree || true,
    attributes: options.attributes || true,
    characterData: options.characterData || true,
  })
  return mutation
}
