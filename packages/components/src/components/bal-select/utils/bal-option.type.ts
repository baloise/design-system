export interface BalOptionValue<T = unknown> {
  value: string
  label: string
  disabled: boolean
  data?: T
}
