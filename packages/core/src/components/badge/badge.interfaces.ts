export const BADGE_SIZES = ['small', 'large', ''] as const
export const BADGE_COLORS = ['grey', 'danger', 'warning', 'success', 'red', 'yellow', 'green', 'purple', ''] as const
export const BADGE_POSITIONS = ['card', 'button', 'tabs', ''] as const

export type BadgeSize = (typeof BADGE_SIZES)[number]
export type BadgeColor = (typeof BADGE_COLORS)[number]
export type BadgePosition = (typeof BADGE_POSITIONS)[number]
