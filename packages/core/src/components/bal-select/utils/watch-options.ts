import { HTMLStencilElement, transformTag } from '@stencil/core/internal'

export const watchForOptions = <T extends HTMLStencilElement>(
  containerEl: HTMLElement | HTMLStencilElement,
  tagName: string,
  onChange: (el: T | undefined) => void,
) => {
  /* tslint:disable-next-line */
  if (typeof MutationObserver === 'undefined') {
    return
  }

  const mutation = new MutationObserver(mutationList => {
    mutationList = mutationList.filter(
      record =>
        record.target.nodeName === transformTag(tagName).toUpperCase() || record.target.nodeName === transformTag('bal-select').toUpperCase(),
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
