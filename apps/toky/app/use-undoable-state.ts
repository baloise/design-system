import { useState } from 'react'

interface History<T> {
  past: T[]
  present: T
  future: T[]
}

export interface UndoableState<T> {
  undo: () => void
  redo: () => void
  canUndo: boolean
  canRedo: boolean
  // Replaces the present value without creating an undo step, and clears
  // existing history — for resyncing from an external source (e.g. the
  // server after a submit), where old undo entries no longer make sense
  // against the new baseline.
  replace: (value: T) => void
}

// Same setState shape as useState, plus undo/redo over every committed
// change. Every call site that already does `setWorking(x)` or
// `setWorking(prev => ...)` keeps working unmodified — this only replaces
// the state's storage, not how it's written to.
export function useUndoableState<T>(
  initial: T | (() => T),
): [T, (updater: T | ((prev: T) => T)) => void, UndoableState<T>] {
  const [history, setHistory] = useState<History<T>>(() => ({
    past: [],
    present: typeof initial === 'function' ? (initial as () => T)() : initial,
    future: [],
  }))

  function setState(updater: T | ((prev: T) => T)) {
    setHistory(h => {
      const next = typeof updater === 'function' ? (updater as (prev: T) => T)(h.present) : updater
      if (next === h.present) return h
      return { past: [...h.past, h.present], present: next, future: [] }
    })
  }

  function replace(value: T) {
    setHistory({ past: [], present: value, future: [] })
  }

  function undo() {
    setHistory(h => {
      if (h.past.length === 0) return h
      const previous = h.past[h.past.length - 1]
      return { past: h.past.slice(0, -1), present: previous, future: [h.present, ...h.future] }
    })
  }

  function redo() {
    setHistory(h => {
      if (h.future.length === 0) return h
      const [next, ...rest] = h.future
      return { past: [...h.past, h.present], present: next, future: rest }
    })
  }

  return [
    history.present,
    setState,
    { undo, redo, canUndo: history.past.length > 0, canRedo: history.future.length > 0, replace },
  ]
}
