export const SPINNER_VARIATIONS = ['logo', 'circle'] as const
export const SPINNER_SIZES = ['sm'] as const
export const SPINNER_LABEL_POSITIONS = ['right', 'bottom'] as const

export type SpinnerVariation = (typeof SPINNER_VARIATIONS)[number]
export type SpinnerSize = (typeof SPINNER_SIZES)[number]
export type SpinnerLabelPosition = (typeof SPINNER_LABEL_POSITIONS)[number]
