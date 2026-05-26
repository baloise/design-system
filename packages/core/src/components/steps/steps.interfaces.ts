export const STEPS_COLORS = ['', 'purple', 'green', 'red', 'yellow'] as const
export type StepsColor = (typeof STEPS_COLORS)[number]

export interface StepsCustomEvent<T> extends CustomEvent<T> {
  detail: T
  target: HTMLDsStepsElement
}

export type StepsChangeDetail = { value: string }
export type StepsChange = StepsCustomEvent<StepsChangeDetail>
