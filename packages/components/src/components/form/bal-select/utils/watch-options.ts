export const watchForOptions = <T extends HTMLElement>(
  containerEl: HTMLElement,
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
