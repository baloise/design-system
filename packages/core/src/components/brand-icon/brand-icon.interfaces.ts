export const BRAND_ICON_COLORS = ['purple', 'red', 'yellow', 'green'] as const

export const BRAND_ICON_SIZES = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const

export type IconColor = (typeof BRAND_ICON_COLORS)[number] | undefined
export type IconSize = (typeof BRAND_ICON_SIZES)[number] | undefined
