export type PausableTimer = {
  resume(): void
  pause(): void
  clear(): void
}

export function createPausableTimer(callback: () => void, delay: number): PausableTimer {
  let timerId: number | undefined
  let start = 0
  let remaining = delay

  function resume() {
    start = Date.now()
    timerId = window.setTimeout(callback, remaining)
  }

  function pause() {
    if (timerId) {
      clearTimeout(timerId)
      remaining -= Date.now() - start
    }
  }

  function clear() {
    if (timerId) clearTimeout(timerId)
  }

  resume()

  return { pause, resume, clear }
}
