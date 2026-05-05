export const SPINNER_COLORS = ['blue', 'white'] as const
export const SPINNER_VARIATIONS = ['logo', 'circle'] as const
export const SPINNER_SIZES = ['sm', ''] as const

export type SpinnerColor = (typeof SPINNER_COLORS)[number]
export type SpinnerVariation = (typeof SPINNER_VARIATIONS)[number]
export type SpinnerSize = (typeof SPINNER_SIZES)[number]
