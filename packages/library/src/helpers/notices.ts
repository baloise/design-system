const createNoticesUtils = () => {
  // const DURATION = 5000

  let container: HTMLDivElement

  const shouldQueue = () => {
    return container.childElementCount > 0
  }

  const setupContainer = () => {
    container = document.querySelector("body" + ">.bal-notices")

    if (container) return

    if (!container) {
      container = document.createElement("div")
      container.className = "bal-notices"
    }

    document.body.appendChild(container)
  }

  const showNotice = (element: HTMLBalToastElement, duration?: number) => {
    if (shouldQueue()) {
      // Call recursively if should queue
      setTimeout(() => showNotice(element, duration), 250)
      return
    }

    container.insertAdjacentElement("afterbegin", element)
    // element.closeIn(duration || DURATION)
  }

  setupContainer()

  return {
    showNotice,
  }
}

export const noticesUtils = createNoticesUtils()
