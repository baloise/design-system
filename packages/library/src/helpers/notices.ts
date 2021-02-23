const createNoticesUtils = () => {
  // const DURATION = 5000

  let container: HTMLDivElement | null = null

  const shouldQueue = () => {
    if (container) {
      return container.childElementCount > 0
    }
    return false
  }

  const setupContainer = () => {
    container = document.querySelector('body' + '>.bal-notices')

    if (container) return

    if (!container) {
      container = document.createElement('div')
      container.className = 'bal-notices'
    }

    document.body.appendChild(container)
  }

  const showNotice = (element: HTMLBalToastElement, duration?: number) => {
    if (shouldQueue()) {
      // Call recursively if should queue
      setTimeout(() => showNotice(element, duration), 250)
      return
    }

    if (container) {
      container.insertAdjacentElement('afterbegin', element)
    }
  }

  setupContainer()

  return {
    showNotice,
  }
}

export const noticesUtils = createNoticesUtils()
