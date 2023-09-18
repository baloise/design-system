export const showContainerElement = (containerEl: HTMLDivElement) => {
  if (containerEl) {
    showElement(containerEl)
  }
}

export const hideContainerElement = (containerEl: HTMLDivElement) => {
  if (containerEl) {
    hideElement(containerEl)
  }
}

export const showArrowElement = (arrowEl: HTMLDivElement) => {
  if (arrowEl) {
    showElement(arrowEl)
  }
}

export const hideArrowElement = (arrowEl: HTMLDivElement) => {
  if (arrowEl) {
    Object.assign(arrowEl.style, {
      left: '',
      top: '',
      display: 'none',
      visibility: 'hidden',
    })
  }
}

export const showElement = (element?: HTMLElement) => {
  if (element) {
    element.style.setProperty('display', 'block')
    element.style.setProperty('visibility', 'visible')
  }
}

export const hideElement = (element?: HTMLElement) => {
  if (element) {
    element.style.removeProperty('display')
    element.style.removeProperty('visibility')
  }
}
