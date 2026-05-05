export const CLOSE_SIZES = ['', 'sm', 'md', 'small', 'medium'] as const

export type CloseSize = (typeof CLOSE_SIZES)[number]
