export const DIVIDER_LAYOUTS = ['horizontal', 'vertical'] as const
export const DIVIDER_COLORS = ['primary', 'secondary', 'default', 'inverted'] as const

export const DIVIDER_SPACES = ['none', '2xs', 'xs', 'sm', 'base', 'md', 'lg', 'xl', '2xl', '3xl'] as const

export type DividerLayout = (typeof DIVIDER_LAYOUTS)[number]
export type DividerColor = (typeof DIVIDER_COLORS)[number]
export type DividerSpace = (typeof DIVIDER_SPACES)[number]
