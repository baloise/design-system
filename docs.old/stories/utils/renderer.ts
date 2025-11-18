export const startObserving = (domNode, callback) => {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(function (mutation) {
      if (mutation.attributeName === 'hidden') {
        callback()
      }
    })
  })

  observer.observe(domNode, {
    childList: false,
    attributes: true,
    characterData: false,
    subtree: false,
  })

  return observer
}

export const useContentLoaded = callback => {
  const doc = document

  if (doc) {
    doc.addEventListener('DOMContentLoaded', () => callback())
  } else {
    setTimeout(() => callback(), 32)
  }
}

export const ListenerFactory = () => {
  const listeners = [] as any[]

  const addEventListener = (type: string, context, listener: (event: UIEvent) => void) => {
    const root = getRootElement(context)

    while (listeners.length > 0) {
      root?.removeEventListener(type as any, listeners.pop() as any)
    }

    root?.addEventListener(type as any, listener)
    listeners.push(listener)
    startObserving(root, () => {
      root?.removeEventListener(type as any, listener)
    })
  }

  return {
    listeners,
    addEventListener,
  }
}

export const getRootElement = context => {
  const [root] = [document.getElementById(`story--${context?.id}`), document.getElementById(`storybook-root`)].filter(
    el => el !== null,
  )

  return root
}

export const debounce = (func: (...args: any[]) => void, wait = 0) => {
  let timer: any
  return (...args: any[]): any => {
    clearTimeout(timer)
    timer = setTimeout(func, wait, ...args)
  }
}

export const withRender = callback => ({
  render: render(callback),
})

export const render = callback => {
  return args => renderer({ args, template: callback(args) })
}

export const renderer = ({ args, template }) => {
  const section: HTMLElement = document.createElement('section')
  const root = document.getElementById('storybook-root')

  const events = Object.keys(args)
    .filter(key => key.startsWith('onBal'))
    .map(key => ({ key, name: 'b' + key.slice(3) }))

  events.forEach(event => {
    root?.addEventListener(event.name as any, args[event.key] as any)
  })

  startObserving(root, () => {
    events.forEach(event => {
      root?.removeEventListener(event.name as any, args[event.key] as any)
    })
  })

  section.innerHTML = template
  return section
}

export const withTriggerRender = callback => ({
  render: renderWithTrigger(callback),
})

export const renderWithTrigger = callback => {
  return args => rendererWithTrigger({ args, template: callback(args) })
}

export const rendererWithTrigger = ({ args, template }) => {
  const section: HTMLElement = document.createElement('section')
  const root = document.getElementById('storybook-root')

  const events = Object.keys(args)
    .filter(key => key.startsWith('onBal'))
    .map(key => ({ key, name: 'b' + key.slice(3) }))

  events.forEach(event => {
    root?.addEventListener(event.name as any, args[event.key] as any)
  })

  startObserving(root, () => {
    events.forEach(event => {
      root?.removeEventListener(event.name as any, args[event.key] as any)
    })
  })

  section.innerHTML = template
  return section
}
