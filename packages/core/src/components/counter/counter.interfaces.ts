import { InputColor } from '../input/input.interfaces'

export type { InputColor }

export interface CounterCustomEvent<T> extends CustomEvent<T> {
  detail: T
  target: HTMLDsCounterElement
}

export type CounterChangeDetail = number
export type CounterChange = CounterCustomEvent<CounterChangeDetail>

export type CounterInputDetail = number
export type CounterInput = CounterCustomEvent<CounterInputDetail>

export type CounterIncreaseDetail = number
export type CounterIncrease = CounterCustomEvent<CounterIncreaseDetail>

export type CounterDecreaseDetail = number
export type CounterDecrease = CounterCustomEvent<CounterDecreaseDetail>

export type CounterFocusDetail = void
export type CounterFocus = CounterCustomEvent<CounterFocusDetail>

export type CounterBlurDetail = void
export type CounterBlur = CounterCustomEvent<CounterBlurDetail>
