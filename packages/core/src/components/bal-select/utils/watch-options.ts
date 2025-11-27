import { HTMLStencilElement } from '@stencil/core/internal'

export const watchForOptions = <T extends HTMLStencilElement>(
  containerEl: HTMLElement | HTMLStencilElement,
  tagName: string,
  onChange: (el: T | undefined) => void,
): MutationObserver | undefined => {
  /* tslint:disable-next-line */
  if (typeof MutationObserver === 'undefined') {
    return undefined
  }

  const mutation = new MutationObserver(mutationList => {
    mutationList = mutationList.filter(
      record =>
        record.target.nodeName === tagName.toUpperCase() || record.target.nodeName === 'bal-select'.toUpperCase(),
    )
    if (mutationList.length > 0) {
      onChange(undefined)
    }
  })
  mutation.observe(containerEl, {
    childList: true,
    subtree: true,
    attributes: true,
    characterData: true,
  })
  return mutation
}
