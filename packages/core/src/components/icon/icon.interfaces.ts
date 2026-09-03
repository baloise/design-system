export const ICON_COLORS = ['primary', 'primary-light', 'grey', 'success', 'danger', 'info', 'warning'] as const

export const ICON_SIZES = ['sm', 'md', 'lg', 'xl'] as const

export type IconColor = (typeof ICON_COLORS)[number] | undefined
export type IconSize = (typeof ICON_SIZES)[number] | undefined
