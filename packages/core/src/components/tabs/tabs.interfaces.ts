export namespace DS {
  export const TABS_COLORS = ['', 'purple', 'green', 'red', 'yellow'] as const
  export type TabsColor = (typeof TABS_COLORS)[number]
}

export const TABS_VERTICAL_COL_SIZES = [
  'full',
  'half',
  'one-quarter',
  'one-third',
  'three-quarters',
  'two-thirds',
] as const
export type TabsVerticalColSize = (typeof TABS_VERTICAL_COL_SIZES)[number]

export interface TabsCustomEvent<T> extends CustomEvent<T> {
  detail: T
  target: HTMLDsTabsElement
}

export type TabsChangeDetail = { value: string }
export type TabsChange = TabsCustomEvent<TabsChangeDetail>
