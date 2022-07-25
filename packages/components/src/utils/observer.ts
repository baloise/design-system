export const observeItems = (target: Node, tag: string, notify: () => void) => {
  /* tslint:disable-next-line */
  if (typeof MutationObserver === 'undefined') {
    return
  }

  const mutation = new MutationObserver(mutationList => {
    mutationList = mutationList.filter(record => record.target.nodeName === tag.toLocaleUpperCase())
    if (mutationList.length > 0) {
      notify()
    }
  })

  mutation.observe(target, {
    childList: true,
    subtree: true,
    attributes: true,
    characterData: true,
  })

  return mutation
}
