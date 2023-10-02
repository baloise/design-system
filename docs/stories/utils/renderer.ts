const startObserving = (domNode, callback) => {
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

export const render = callback => {
  return args => renderer({ args, template: callback(args) })
}

export const withRender = callback => ({
  render: render(callback),
})
