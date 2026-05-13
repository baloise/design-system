export interface SegmentItemInterface<TValue = any> {
  label: string
  value: TValue | null | undefined
  description?: string
  icon?: string
  svg?: string
}
