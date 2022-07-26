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
    attributes: true,
    characterData: true,
    subtree: false,
  })

  return mutation
}

export const observeHasClassActive = (target: Node, notify: () => void) => {
  /* tslint:disable-next-line */
  if (typeof MutationObserver === 'undefined') {
    return
  }

  const mutation = new MutationObserver(list => {
    let hasActiveClass = false
    list.forEach((record: any) => {
      if (record.target.classList.value.includes('--active')) {
        hasActiveClass = true
      }
    })

    if (hasActiveClass) {
      notify()
    }
  })

  mutation.observe(target, {
    attributes: true,
    childList: false,
    characterData: false,
    subtree: false,
  })

  return mutation
}
