import { act, type ReactNode } from 'react'
import { createRoot, type Root } from 'react-dom/client'

export function render(ui: ReactNode) {
  const container = document.createElement('div')
  document.body.appendChild(container)
  let root!: Root

  act(() => {
    root = createRoot(container)
    root.render(ui)
  })

  return {
    container,
    rerender: (next: ReactNode) => {
      act(() => {
        root.render(next)
      })
    },
    unmount: () => {
      act(() => {
        root.unmount()
      })
      container.remove()
    },
  }
}

export function renderHook<T>(hook: () => T) {
  const result: { current: T } = { current: undefined as T }

  function Probe() {
    result.current = hook()
    return null
  }

  const view = render(<Probe />)

  return {
    result,
    rerender: () => view.rerender(<Probe />),
    unmount: view.unmount,
  }
}
